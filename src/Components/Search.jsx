import React, { Component } from 'react';
import { Nav, Button, InputGroup, InputGroupAddon, Input } from "reactstrap";

class SearchComponent extends Component {
    render() {
        return (
            <Nav>
                <div className="nav-default">
                    <InputGroup className="txt-lg">
                        <label className="lb-default">SEARCH</label>
                        <Input />
                        <InputGroupAddon addonType="append">
                            <Button color="secondary">Search</Button>
                        </InputGroupAddon>
                    </InputGroup>
                   </div>
            </Nav>
                );
            }
        }
         
export default SearchComponent;