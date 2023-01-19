import { runConcurrently } from './index';

const run = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

test('should run in concurrently of 5', async () => {
  const runPromises: ((value?: unknown) => void)[] = [];
  
  run.mockImplementation(() => {
    return new Promise((res) => 
    runPromises.push(res));
  });

  runConcurrently({ fn: run, concurrency: 5, totalRuns: 13 });
  
  expect(run).toHaveBeenCalledTimes(5);

  runPromises[0]();
  await new Promise(res => setTimeout(res));
  
  expect(run).toHaveBeenCalledTimes(6);

  runPromises[1]();
  runPromises[2]();

  await new Promise(res => setTimeout(res));

  expect(run).toHaveBeenCalledTimes(8);
  

  runPromises[3]();
  runPromises[4]();
  runPromises[5]();
  runPromises[6]();
  runPromises[7]();

  await new Promise(res => setTimeout(res));

  expect(run).toHaveBeenCalledTimes(13);

  runPromises[8]();
  runPromises[9]();
  runPromises[10]();
  runPromises[11]();
  runPromises[12]();

  await new Promise(res => setTimeout(res));

  expect(runPromises).toHaveLength(13)

});

test('should run it 20 times', async () => {
  run.mockResolvedValue(undefined);

  await runConcurrently({ fn: run, concurrency: 5, totalRuns: 20 });

  expect(run).toHaveBeenCalledTimes(20);
  expect(run.mock.calls).toMatchInlineSnapshot(`
[
  [
    0,
  ],
  [
    1,
  ],
  [
    2,
  ],
  [
    3,
  ],
  [
    4,
  ],
  [
    5,
  ],
  [
    6,
  ],
  [
    7,
  ],
  [
    8,
  ],
  [
    9,
  ],
  [
    10,
  ],
  [
    11,
  ],
  [
    12,
  ],
  [
    13,
  ],
  [
    14,
  ],
  [
    15,
  ],
  [
    16,
  ],
  [
    17,
  ],
  [
    18,
  ],
  [
    19,
  ],
]
`);
});