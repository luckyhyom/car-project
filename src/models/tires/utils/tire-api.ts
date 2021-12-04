import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { CardocTire } from '../dto/cardocTire.dto';
import { TireSet } from '../dto/tireSet.dto';

export class TireAPI {
    static async get(trimId): Promise<TireSet> {
        const url = 'https://dev.mycar.cardoc.co.kr/v1/trim/'
        const res = await axios.get(`${url}${trimId}`)
        const dto = plainToInstance(CardocTire, res.data.spec.driving)
        
        const frontTire = await dto.getFront();
        const rearTire = await dto.getRear();
        return TireSet.of(frontTire, rearTire);
    }
}