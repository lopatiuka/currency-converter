import axios from 'axios';

export class RateService {

    private path: string = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

    public getUahRate = async () => {
        try {
            const results = await axios.get( this.path );
            return results.data;
        }
        catch( err ) {
            return err;
        }
    }

    public getRate = async ( inputCurrency: string, outputCurrency: string ) => {
        try {
            const results = await axios.get( `https://free.currconv.com/api/v7/convert?q=${ inputCurrency }_${ outputCurrency }&compact=ultra&apiKey=b0ef941b99503b4198ff` );
            return results.data;
        }
        catch( err ) {
            return err;
        }
    }
}