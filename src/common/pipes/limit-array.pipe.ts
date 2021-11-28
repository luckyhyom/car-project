import { HttpException, HttpStatus, ParseArrayPipe } from "@nestjs/common";

export class LimitArrayPipe extends ParseArrayPipe {
    constructor(options = {}, private min: number, private max: number) {
        super(options)
    }

    async transform(value, metadata) {
        if (Array.isArray(value)) {
            if(value.length < this.min) {
                throw new HttpException(`Array length is longer than ${this.min}`, HttpStatus.BAD_REQUEST);
            }
            if(value.length > this.max) {
                throw new HttpException(`Array length is shorter than ${this.max}`, HttpStatus.BAD_REQUEST);
            }
        }
        return await super.transform(value, metadata);
    }
}