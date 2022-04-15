import React from "react";
import { Container, Row, Form, FormControl } from "react-bootstrap";
import { mainStore } from "../stores/main-store";
import { observer } from 'mobx-react';

@observer
export class MainComponent extends React.Component<{}, {}> {

    render() {
        return <main>
            <Container>
                <h2>Check rates</h2>

                <Row>
                    <div className="amount">
                        <FormControl type="number" min="1" className="input-value" value={ mainStore.inputValue } onChange={ e => mainStore.setInputSum( e.target.value ) }/>
                        <Form.Select name="input-currency" id="input-currency" onChange={ e => mainStore.setInputCurrency( e.target.options[e.target.selectedIndex].text ) }>
                            <option key="input-usd" value="usd">USD</option>
                            <option key="input-eur" value="eur">EUR</option>
                            <option key="input-uah" value="uah" selected>UAH</option>
                        </Form.Select>
                    </div>

                    <div className="amount">
                        <FormControl type="number" min="1" className="output-value" value={ mainStore.outputValue } onChange={ e => mainStore.setOutputSum( e.target.value ) }/>
                        <Form.Select name="output-currency" id="output-currency" onChange={ e => mainStore.setOutputCurrency( e.target.options[e.target.selectedIndex].text ) }>
                            <option key="input-usd" value="usd">USD</option>
                            <option key="input-eur" value="eur">EUR</option>
                            <option key="input-uah" value="uah">UAH</option>
                        </Form.Select>
                    </div>
                </Row>
            </Container>
        </main>
    }
}