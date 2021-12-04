import { Exclude } from "class-transformer";

export class CardocTire {
    @Exclude() private readonly name;
    @Exclude() private readonly type;
    @Exclude() private readonly steering;
    @Exclude() private readonly frontBreak;
    @Exclude() private readonly rearBreak;
    @Exclude() private readonly frontSuspension;
    @Exclude() private readonly rearSuspension;
    @Exclude() private readonly gearRatio;
    @Exclude() private readonly powerSteering;
    private frontTire;
    private rearTire;

    constructor() {}

    async getFront() {
        return await this.removeSpace(this.frontTire.value);
    }

    async getRear() {
        return await this.removeSpace(this.rearTire.value);
    }

    private async removeSpace(value) {
        return await value.replace(/(\s*)/g, "");
    }
}