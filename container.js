const fs = require('fs')

class Container {
    constructor(filePath) {
        this.filePath = filePath
    }

    async #readFile() {
        try {
            const content = await fs.promises.readFile(this.filePath, 'utf-8')
            const parsedContent = JSON.parse(content)
            return parsedContent
        } catch (error) {
            console.log(error);
        }
    }

    async save(obj) {
        let fileContent = await this.#readFile()
        console.log(fileContent);
        if (fileContent.length !== 0) {
            await fs.promises.writeFile(this.filePath, JSON.stringify([...fileContent, { ...obj, id: fileContent[fileContent.length - 1].id + 1 }], null, 2))
            fileContent = await this.#readFile()
            console.log(`El nuevo id asignado es: ${fileContent[fileContent.length - 1].id}`);
        } else {
            await fs.promises.writeFile(this.filePath, JSON.stringify([{ ...obj, id: 1 }]), 'utf-8')
            fileContent = await this.#readFile()
            console.log(`El nuevo id asignado es: ${fileContent[fileContent.length - 1].id}`);
        }
    }

    async getById(getId) {
        const fileContent = await this.#readFile()
        const result = fileContent.find(prod => prod.id === getId)
        if (result) {
            return result;
        } else {
            console.log(null);
            return null
        }
    }

    async getAll() {
        const fileContent = await this.#readFile()
        return fileContent
    }

    async deleteById(deleteId) {
        const fileContent = await this.#readFile()
        let index = 0
        fileContent.map(prod => {
            if (prod.id === deleteId) {
                fileContent.splice(index, 1)
            }
            index = index + 1
        })
        this.deleteAll()
        await fs.promises.writeFile(this.filePath, JSON.stringify(fileContent, null, 2))
    }

    async getRandom(){
        const fileContent = await this.#readFile()
        const random=fileContent[Math.floor(Math.random()*fileContent.length)].id
        return this.getById(random)
    }

    async deleteAll() {
        await fs.promises.writeFile(this.filePath, JSON.stringify([]), 'utf-8')
    }
}

module.exports = Container

const container = new Container('./products.txt')

// container.save({ name: 'prod7', price: 135 })
