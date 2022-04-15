import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { mainStore } from "../stores/main-store";
import { observer } from 'mobx-react';

@observer
export class HeaderComponent extends React.Component<{}, {}> {

    constructor( props: any ) {
        super( props );
        mainStore.getUahRates();
    }

    render() {
        return <header>
            <Container>
                <p>Current UAH rates</p>
                <Row>
                    <div className="wrapper">
                        {
                            mainStore.uahRates.map( currency => {
                                if( currency.ccy === "BTC" ) {
                                    return
                                }

                                return <div className="rates" key={ currency.ccy }>
                                    <span className="currency">{ currency.ccy }</span>: <span className="value">{ Number.parseFloat( currency.buy ).toFixed( 2 ) }</span>
                                </div>
                            })
                        }
                    </div>
                </Row>
            </Container>
        </header>
    }
}