import fs from "fs";
import path from "path";
import { hashFile } from "../hashFile";

describe("hashFile.test", () => {
  const file = path.join("temp", "test-file-" + Date.now());
  beforeAll(() => {
    fs.writeFileSync(file, "hello world!", { encoding: "utf-8" });
  });
  afterAll(() => {
    fs.unlinkSync(file);
  });
  test("正确计算文件hash", async () => {
    const r = await hashFile(file, {
      hash: {
        digest: "base64"
      }
    }).promise;
    expect(r + "").toBe("/D/5joxqDTCH1RXARz+Gdw==");
  });

  test("传入不存在的文件", async () => {
    const nofile = path.join("temp", "test-file-" + Date.now());
    try {
      await hashFile(nofile, {
        hash: {
          digest: "base64"
        }
      }).promise;
    } catch (err) {
      expect(err + "").toContain(`文件 ${nofile} 不存在`);
    }
  });
  test("传入文件夹", async () => {
    const nofile = path.join("temp");
    try {
      await hashFile(nofile, {
        hash: {
          digest: "base64"
        }
      }).promise;
    } catch (err) {
      expect(err + "").toContain(`${nofile} 不是文件类型`);
    }
  });
});