import { Exclude } from "class-transformer";

export class TireSet {
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

    async isRightFormat() {
        const tireStandardReg = /[1-3][0-9][05]\/[1-9][0-9]Z?[RD][1-2][0-9]/;
        const front = await this.getFront();
        const rear = await this.getRear();
        return tireStandardReg.test(front) && tireStandardReg.test(rear)
    }

    private async removeSpace(value) {
        return await value.replace(/(\s*)/g, "");
    }
}