import * as React from "react";
import { slide as Menu} from "react-burger-menu";
import { HashRouter, NavLink, Route } from "react-router-dom";
import { ITenant, IUser } from "../../definitions";
import { About } from "./About";
import { Analytics } from "./Analytics";
import { MenuWrap } from "./MenuWrap";
import { Packages } from "./Packages";
import { Tenants } from "./Tenants";

export interface IContentState {
    menuOpen: boolean;
}

export interface IContentProps {
    data: ITenant[];
    user: IUser;
}

export class Content extends React.Component<IContentProps, IContentState> {
    constructor(props: IContentProps) {
      super(props);
      this.state = {
        menuOpen: false,
      };
    }

    public handleMenuStateChange(state) {
        this.setState({menuOpen: state.isOpen});
    }

    public closeMenu() {
        this.setState({menuOpen: false});
    }

    public getItems() {
      const items = [
        <NavLink onClick={() => this.closeMenu()} key="1" exact to="/">
          <a>
            <i className="fa fa-fw fa-star-o" />
            <span>Tenants</span>
          </a>
        </NavLink>,
        <NavLink onClick={() => this.closeMenu()} key="2" to="/packages">
          <a>
            <i className="fa fa-fw fa-bar-chart-o" />
            <span>Packages</span>
          </a>
        </NavLink>,
        <NavLink onClick={() => this.closeMenu()} key="3" to="/analytics">
          <a>
            <i className="fa fa-fw fa-bar-chart-o" />
            <span>Analytics</span>
          </a>
        </NavLink>,
        <NavLink onClick={() => this.closeMenu()} key="4" to="/about">
          <a>
            <i className="fa fa-fw fa-envelope-o" />
            <span>About</span>
          </a>
        </NavLink>,
      ];

      return items;
    }

    public getMenu() {
      const jsx = (
        <MenuWrap wait={20} side={"left"}>
          <Menu id={"slide"}
                pageWrapId={"page-wrap"}
                outerContainerId={"outer-container"}
                isOpen={this.state.menuOpen}
                onStateChange={(state) => this.handleMenuStateChange(state)}
          >
            {this.getItems()}
          </Menu>
        </MenuWrap>
      );
      return jsx;
    }

    public render() {
      return (
        <HashRouter>
            <div id="outer-container" style={{height: "100%"}}>
            {this.getMenu()}
            <main id="page-wrap">
                <div>
                    <Route exact
                      path={"/"}
                      component={
                        () => <Tenants data={this.props.data} />
                      }/>
                    <Route path="/packages" component={Packages}/>
                    <Route path="/analytics" component={Analytics}/>
                    <Route path="/about" component={About}/>
                </div>
            </main>
            </div>
        </HashRouter>
      );
    }
  }
