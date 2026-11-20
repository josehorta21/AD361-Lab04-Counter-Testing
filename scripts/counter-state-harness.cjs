/**
 * Isolated behavior probe of the exact App.tsx source.
 * Transpiles the TSX and uses minimal React-hook/JSX stubs; it is NOT a browser
 * or React Testing Library run. Use npm test to execute the real React DOM tests.
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require(path.resolve(__dirname, '../counter-app/node_modules/typescript'));

const root = path.resolve(__dirname, '..');
const beforePath = path.join(root, 'evidence', 'original-App.tsx');
const afterPath = path.join(root, 'counter-app', 'src', 'App.tsx');
const suites = [
  ['TC-001', [], 0],
  ['TC-002', ['Increment'], 1],
  ['TC-003', ['Decrement'], -1],
  ['TC-004', ['Increment', 'Increment', 'Decrement'], 1],
  ['TC-005', ['Decrement', 'Decrement'], -2],
  ['TC-006', ['Increment', 'Increment', 'Reset'], 0],
  ['TC-007', ['Reset', 'Reset'], 0],
  ['TC-008', ['Decrement', 'Reset', 'Increment'], 1],
];
function createComponent(source) {
  const compiled = ts.transpileModule(fs.readFileSync(source, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 }
  }).outputText;
  let state; let initialized = false;
  const useState = (init) => {
    if (!initialized) { state = init; initialized = true; }
    return [state, (next) => { state = typeof next === 'function' ? next(state) : next; }];
  };
  const jsx = (type, props) => ({ type, props: props ?? {} });
  const fakeRequire = (id) => {
    if (id === 'react') return { useState };
    if (id === 'react/jsx-runtime') return { jsx, jsxs: jsx };
    throw new Error('Unexpected import ' + id);
  };
  const sandbox = { require: fakeRequire, module: { exports: {} }, exports: {} };
  // TS emits exports on the `exports` binding.
  sandbox.exports = sandbox.module.exports;
  vm.runInNewContext(compiled, sandbox, { filename: source });
  const App = sandbox.module.exports.default;
  let tree;
  function rerender() { tree = App(); }
  function flatten(node) {
    if (!node || typeof node !== 'object') return [];
    if (Array.isArray(node)) return node.flatMap(flatten);
    return [node, ...flatten(node.props?.children)];
  }
  rerender();
  return {
    click(label) {
      const btn = flatten(tree).find((n) => n.type === 'button' && n.props.children === label);
      if (!btn) throw new Error('Missing button ' + label);
      btn.props.onClick();
      rerender();
    },
    getCount() {
      const h1 = flatten(tree).find((n) => n.type === 'h1');
      if (!h1) throw new Error('Missing heading');
      return Number(String(Array.isArray(h1.props.children) ? h1.props.children.join('') : h1.props.children).match(/-?\d+/)?.[0]);
    }
  };
}
function runSuite(source, name) {
  const output = [`${name}: exact App.tsx event handlers; mocked hook + JSX runtime (not a DOM test)`];
  let passed = 0;
  for (const [id, actions, expected] of suites) {
    const component = createComponent(source);
    for (const action of actions) component.click(action);
    const actual = component.getCount();
    const ok = actual === expected;
    if (ok) passed++;
    output.push(`${id} ${ok ? 'PASS' : 'FAIL'} | actions: ${actions.join(' -> ') || '(initial render)'} | expected: ${expected} | actual: ${actual}`);
  }
  output.push(`TOTAL: ${passed}/${suites.length} passed, ${suites.length - passed} failed`);
  return output.join('\n') + '\n';
}
if (require.main === module) {
  const baseline = runSuite(beforePath, 'BASELINE (provided starter source)');
  const repeat = runSuite(beforePath, 'BASELINE RECHECK (original starter source)');
  const repaired = runSuite(afterPath, 'AFTER CORRECTION (submitted source)');
  const observations = (result) => result.split('\n').filter(line => line.startsWith('TC-'));
  if (JSON.stringify(observations(baseline)) !== JSON.stringify(observations(repeat))) {
    throw new Error('Baseline failures were not reproducible');
  }
  fs.writeFileSync(path.join(root, 'evidence', 'baseline-handler-results.txt'), baseline);
  fs.writeFileSync(path.join(root, 'evidence', 'baseline-repeatability.txt'), repeat);
  fs.writeFileSync(path.join(root, 'evidence', 'postfix-handler-results.txt'), repaired);
  console.log(baseline + '\n' + repeat + '\n' + repaired);
  if (!repaired.includes('TOTAL: 8/8 passed, 0 failed')) process.exitCode = 1;
}
