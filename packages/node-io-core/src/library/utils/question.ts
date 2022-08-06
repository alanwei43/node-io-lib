import readline from "readline";


/**
 * 控制台输入
 * @date 2022-01-15
 */
export function question(query: string): Promise<string> {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(query, answer => {
      resolve(answer);
      rl.close();
    });
  });
}