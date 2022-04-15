import { types } from "mobx-state-tree";

export const UahRateModel = types.model({
    ccy: types.optional( types.string, ""),
    buy: types.optional( types.string, "0" ),
})