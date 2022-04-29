export default class Assignment {
    constructor({ id, name, title, description, type, duration, tags }) {
        this.id = id
        this.name = name
        this.title = title
        this.description = description
        this.type = type
        this.duration = duration
        this.tags = tags
    }
}
