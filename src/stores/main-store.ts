import { types, unprotect } from "mobx-state-tree";
import { UahRateModel } from "../models/uah-rate-model";
import { RateService } from "../services/api-services/rate-service";

const service: RateService = new RateService();

const MainStore = types.model({
    inputValue: types.optional( types.string, "" ),
    outputValue: types.optional( types.string, "" ),
    inputCurrency: types.optional( types.string, "uah" ),
    outputCurrency: types.optional( types.string, "usd" ),
    uahRates: types.array( UahRateModel ),
    currentRate: types.optional( types.string, "0" ),
})
.actions( self => ({

    setCurrentRate( rate: string ) {
        self.currentRate = rate;
    },

    setInputValue( value: string ) {
        self.inputValue = value;
    },

    setOutputValue( value: string ) {
        self.outputValue = value;
    },

    async convert( from: string, to: string, reverse?: boolean ) {
        let rate = await service.getRate( from, to )
        let keys = Object.keys( rate );
        this.setCurrentRate( rate[ keys[0] ].toString() );
        
        if ( !reverse ) {
            let result = Number.parseFloat( self.inputValue ) *  Number.parseFloat( self.currentRate );
            this.setOutputValue( result.toFixed( 2 ).toString() );
        }
        else {
            let result = Number.parseFloat( self.outputValue ) *  Number.parseFloat( self.currentRate );
            this.setInputValue( result.toFixed( 2 ).toString() );
        }
    },

    checkInput ( value: string ) {
        if( value === "0" )
        return true;
    },

    setInputSum( newSum: string ) {
        if( this.checkInput( newSum ) )
        return

        self.inputValue = newSum;

        if( newSum === "" ) {
            self.outputValue = "";
            return
        }
        
        this.convert( self.inputCurrency, self.outputCurrency )
    },

    setOutputSum( newSum: string ) {
        if( this.checkInput( newSum ) )
        return
        
        self.outputValue = newSum;

        if( newSum === "" ) {
            self.inputValue = "";
            return
        }

        this.convert( self.outputCurrency, self.inputCurrency, true )
    },

    setInputCurrency ( inputCurrency: string ) {
        self.inputCurrency = inputCurrency.toUpperCase();
        this.convert( self.inputCurrency, self.outputCurrency )
    },

    setOutputCurrency ( outputCurrency: string ) {
        self.outputCurrency = outputCurrency.toUpperCase();
        this.convert( self.inputCurrency, self.outputCurrency );
    },

    setUahRates( rates: any ) {
        self.uahRates = rates
    },

    async getUahRates() {
        let result = await service.getUahRate();

        this.setUahRates( result ) 
    }
}))

export const mainStore = MainStore.create({});
unprotect( mainStore );