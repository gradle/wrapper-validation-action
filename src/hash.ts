import * as crypto from "crypto"
import * as fs from "fs"

export async function sha256File(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash("sha256")
        fs.createReadStream(path)
            .on("data", data => hash.update(data))
            .on("end", () => resolve(hash.digest("hex")))
            .on("error", error => reject(error))
    })
}
