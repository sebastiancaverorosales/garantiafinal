import React from "react";
import "../css/HeaderPlantilla.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {};

  render() {
    return (
      <header className="MuiPaper-root MuiPaper-elevation MuiPaper-elevation4 MuiAppBar-root MuiAppBar-colorPrimary MuiAppBar-positionFixed mui-fixed css-1ew0fbc">
        <div className="MuiToolbar-root MuiToolbar-regular css-1vnwtzf">
          <button
            className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1matkb5"
            type="button"
            id="Menu"
            onClick={this.props.GetIds}
          >
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="MenuIcon"
            >
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </button>
          {/* <button
            className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1sr3j4o"
            type="button"
            aria-label="Search"
          >
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="SearchIcon"
            >
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </button> */}
          <div className="MuiBox-root css-i9gxme"></div>
          {/* <button
            className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1sr3j4o"
            type="button"
            aria-label="Contacts"
          >
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="UsersIcon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
            </svg>
          </button>
          <button
            className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1sr3j4o"
            type="button"
            aria-label="Notifications"
          >
            <span className="MuiBadge-root BaseBadge-root css-1rzb3uu">
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="BellIcon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
              </svg>
              <span className="MuiBadge-badge MuiBadge-dot MuiBadge-anchorOriginTopRight MuiBadge-anchorOriginTopRightRectangular MuiBadge-overlapRectangular MuiBadge-colorPrimary BaseBadge-badge css-cf0hj9"></span>
            </span>
          </button> */}
          <div
            className="MuiAvatar-root MuiAvatar-circular css-1cdodkk"
            onClick={() => (window.location.href = "/cuenta")}
          >
            <img
              src={
                process.env.PUBLIC_URL + "/images/users/" + cookies.get("foto")
              }
              className="MuiAvatar-img css-1hy9t21"
            />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
