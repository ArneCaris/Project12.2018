import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class CategoryDropdown extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen:false
        }
    }
    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
    render() {
        return (
            <div className="dropdown">
              <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} caret size="sm">
                <DropdownToggle caret>
                  Categories
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem><NavLink to="/posts/category/lifestyle" className="dropdown-item">Lifestyle</NavLink></DropdownItem>
                  <DropdownItem><NavLink to="/posts/category/gaming" className="dropdown-item">Gaming</NavLink></DropdownItem>
                  <DropdownItem><NavLink to="/posts/category/vehicles" className="dropdown-item">Vehicles</NavLink></DropdownItem>
                  <DropdownItem><NavLink to="/posts/category/technology" className="dropdown-item">Technology</NavLink></DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>

            </div>
        );
    }
}

export default CategoryDropdown;