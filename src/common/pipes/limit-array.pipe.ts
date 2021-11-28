import { HttpException, HttpStatus, ParseArrayPipe } from "@nestjs/common";

export class LimitArrayPipe extends ParseArrayPipe {

    /**
     * 
     * @param options
     * options: { items: CreateDTO }, 1, 5
     * @param min 
     * @param max 
     */
    constructor(options = {}, private min: number, private max: number) {
        super(options)
    }

    async transform(value, metadata) {
        if (Array.isArray(value)) {
            if(value.length < this.min) {
                throw new HttpException(`It should be not less than ${this.min}`, HttpStatus.BAD_REQUEST);
            }
            if(value.length > this.max) {
                throw new HttpException(`It should be not more than ${this.max}`, HttpStatus.BAD_REQUEST);
            }
        }
        return await super.transform(value, metadata);
    }
}