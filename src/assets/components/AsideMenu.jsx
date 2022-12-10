import React from "react";
import "../css/AsideMenuPlantilla.css";
import Cookies from "universal-cookie";
import $ from "jquery";

const cookies = new Cookies();
var rol = cookies.get("id_rol");
var rolname;
if (cookies.get("id_rol") == 1) {
  rolname = "Administrador";
} else if (cookies.get("id_rol") == 2) {
  rolname = "Analista";
} else {
  rolname = "Cliente";
}

class AsideMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {};

  render() {
    function setClass() {
      window.onload = () => {
        var page = window.location.pathname;
        var index1;
        if (page == "/") {
          $("#dashboard").addClass("selectedpage");
        } else {
          page = page.slice(1);
          if (page.includes("/")) {
            index1 = page.indexOf("/");
            page = page.slice(0, index1);
          }
          $("#" + page).addClass("selectedpage");
        }
      };
    }
    setClass();
    function isSelected(id) {
      $(".selectedpage").removeClass("selectedpage");
      window.location.href = (null, "", "/" + id);
      if (window.location.pathname == "/" + id) {
        $("#" + id).addClass("selectedpage");
      }
    }
    function OptionsByRol() {
      function Salir() {
        var arreglo = Object.keys(cookies.getAll());
        for (let i = 0; i < arreglo.length; i++) {
          if (arreglo[i]!="logged") {
            cookies.remove(arreglo[i])
          }
        }
        
        cookies.set("logged", "0", { path: "/" });
        window.location.href = "/";
      }
      if (rol == 1) {
        return (
          <>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-129bs90 for-select"
                tabIndex="0"
                id="dashboard"
                href="/"
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ChartBarIcon"
                  >
                    <svg
                      viewBox="0 0 20 18"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0.399902 10.2C0.399902 9.88175 0.52633 9.57652 0.751374 9.35148C0.976418 9.12644 1.28164 9.00001 1.5999 9.00001H3.9999C4.31816 9.00001 4.62339 9.12644 4.84843 9.35148C5.07347 9.57652 5.1999 9.88175 5.1999 10.2V16.2C5.1999 16.5183 5.07347 16.8235 4.84843 17.0485C4.62339 17.2736 4.31816 17.4 3.9999 17.4H1.5999C1.28164 17.4 0.976418 17.2736 0.751374 17.0485C0.52633 16.8235 0.399902 16.5183 0.399902 16.2V10.2ZM7.5999 5.40001C7.5999 5.08175 7.72633 4.77652 7.95137 4.55148C8.17642 4.32643 8.48164 4.20001 8.7999 4.20001H11.1999C11.5182 4.20001 11.8234 4.32643 12.0484 4.55148C12.2735 4.77652 12.3999 5.08175 12.3999 5.40001V16.2C12.3999 16.5183 12.2735 16.8235 12.0484 17.0485C11.8234 17.2736 11.5182 17.4 11.1999 17.4H8.7999C8.48164 17.4 8.17642 17.2736 7.95137 17.0485C7.72633 16.8235 7.5999 16.5183 7.5999 16.2V5.40001ZM14.7999 1.80001C14.7999 1.48175 14.9263 1.17652 15.1514 0.951478C15.3764 0.726434 15.6816 0.600006 15.9999 0.600006H18.3999C18.7182 0.600006 19.0234 0.726434 19.2484 0.951478C19.4735 1.17652 19.5999 1.48175 19.5999 1.80001V16.2C19.5999 16.5183 19.4735 16.8235 19.2484 17.0485C19.0234 17.2736 18.7182 17.4 18.3999 17.4H15.9999C15.6816 17.4 15.3764 17.2736 15.1514 17.0485C14.9263 16.8235 14.7999 16.5183 14.7999 16.2V1.80001Z"></path>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Dashboard</div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1uk9c8u for-select"
                tabIndex="0"
                id="pedidos"
                onClick={() => isSelected("pedidos")}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="UsersIcon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <title>Order_history</title>
                      <g id="Order_history">
                        <path d="M251.2305,448H70.7735a150.4432,150.4432,0,0,0,32.2656-93.5391V64H381.4336V217.1719a8,8,0,0,0,16,0V56a7.9979,7.9979,0,0,0-8-8H95.0391a7.9979,7.9979,0,0,0-8,8V354.4609a134.7126,134.7126,0,0,1-39.711,95.8829A7.9993,7.9993,0,0,0,52.9844,464H251.2305a8,8,0,0,0,0-16Z" />
                        <path d="M333.9961,148.7656h-183.52a8,8,0,0,0,0,16h183.52a8,8,0,0,0,0-16Z" />
                        <path d="M341.9961,210.9688a7.9979,7.9979,0,0,0-8-8h-183.52a8,8,0,1,0,0,16h183.52A7.9979,7.9979,0,0,0,341.9961,210.9688Z" />
                        <path d="M262.2305,265.1719a7.9979,7.9979,0,0,0-8-8H150.4766a8,8,0,0,0,0,16H254.2305A7.9979,7.9979,0,0,0,262.2305,265.1719Z" />
                        <path d="M150.4766,311.375a8,8,0,1,0,0,16h65.2539a8,8,0,0,0,0-16Z" />
                        <path d="M436.7266,287.4609A103.32,103.32,0,0,0,261.7905,342.873l-6.3569-6.3574a7.9991,7.9991,0,0,0-11.3125,11.3125L262.53,366.2363a8.026,8.026,0,0,0,11.3232,0l18.4126-18.4082a7.9991,7.9991,0,0,0-11.3125-11.3125l-1.8169,1.8164a87.3378,87.3378,0,1,1,22.6568,84.0664,7.9991,7.9991,0,0,0-11.3125,11.3125,103.413,103.413,0,0,0,146.2461-146.25Z" />
                        <path d="M363.6055,291.32a7.9979,7.9979,0,0,0-8,8v61.2656a8.115,8.115,0,0,0,2.3506,5.6641l28.9931,28.9922A7.9991,7.9991,0,0,0,398.2617,383.93l-26.6562-26.6563V299.32A7.9979,7.9979,0,0,0,363.6055,291.32Z" />
                      </g>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Pedidos</div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-129bs90 for-select"
                tabIndex="0"
                id="garantias"
                onClick={() => isSelected("garantias")}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ChartBarIcon"
                  >
                    <svg
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <title>Artboard 3</title>
                      <path d="M5,1V3H1V20a3,3,0,0,0,3,3H19.24A3.77,3.77,0,0,0,23,19.24V1ZM3,20V5H5V20a1,1,0,0,1-2,0Zm18-.76A1.76,1.76,0,0,1,19.24,21H6.82A3,3,0,0,0,7,20V3H21Z" />
                      <rect x="11" y="5" width="8" height="2" />
                      <rect x="9" y="9" width="10" height="2" />
                      <rect x="9" y="13" width="10" height="2" />
                      <rect x="9" y="17" width="10" height="2" />
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Garantías</div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1uk9c8u for-select"
                tabIndex="0"
                id="productos"
                onClick={() => isSelected("productos")}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ShoppingBagIcon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Productos</div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1uk9c8u for-select"
                tabIndex="0"
                id="revisiones"
                onClick={() => isSelected("revisiones")}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="UserIcon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-eye"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Revisiones</div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1uk9c8u for-select"
                tabIndex="0"
                id="analistas"
                onClick={() => isSelected("analistas")}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="UserIcon"
                  >
                    <svg
                      version="1.1"
                      id="Icons"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 32 32"
                    >
                      <path
                        d="M31.7,20.9c-0.1-0.5-0.7-0.8-1.2-0.7c-0.7,0.2-1.2,0-1.3-0.2c-0.1-0.2,0-0.7,0.5-1.3c0.4-0.4,0.4-1,0-1.4
	c-1-1-2.2-1.7-3.6-2.1c-0.5-0.1-1.1,0.2-1.2,0.7c-0.2,0.7-0.6,1-0.9,1s-0.6-0.4-0.9-1c-0.2-0.5-0.7-0.8-1.2-0.7
	c-1.4,0.4-2.6,1.1-3.6,2.1c-0.4,0.4-0.4,1,0,1.4c0.5,0.5,0.6,1,0.5,1.3c-0.1,0.2-0.6,0.4-1.3,0.2c-0.5-0.1-1.1,0.2-1.2,0.7
	C16.1,21.6,16,22.3,16,23s0.1,1.4,0.3,2.1c0.1,0.5,0.7,0.8,1.2,0.7c0.7-0.2,1.2,0,1.3,0.2c0.1,0.2,0,0.7-0.5,1.3
	c-0.4,0.4-0.4,1,0,1.4c1,1,2.2,1.7,3.6,2.1c0.1,0,0.2,0,0.3,0c0.4,0,0.8-0.3,1-0.7c0.2-0.7,0.6-1,0.9-1s0.6,0.4,0.9,1
	c0.2,0.5,0.7,0.8,1.2,0.7c1.4-0.4,2.6-1.1,3.6-2.1c0.4-0.4,0.4-1,0-1.4c-0.5-0.5-0.6-1-0.5-1.3c0.1-0.2,0.6-0.4,1.3-0.2
	c0.5,0.1,1.1-0.2,1.2-0.7c0.2-0.7,0.3-1.4,0.3-2.1S31.9,21.6,31.7,20.9z M24,27c-2.2,0-4-1.8-4-4s1.8-4,4-4c2.2,0,4,1.8,4,4
	S26.2,27,24,27z"
                      />
                      <path
                        d="M14,23c0-1.2,0.2-2.3,0.6-3.3c0-0.1,0-0.1,0-0.2c0,0,0.1-0.1,0.1-0.1c0.5-1.2,1.1-2.2,1.9-3.1c0.1-0.4,0.2-0.7,0.3-1.1
	c0-0.3,0-0.6-0.2-0.8S16.2,14,15.9,14c-1.1,0-2.1-0.4-2.9-1h6c0.6,0,1-0.4,1-1s-0.4-1-1-1h-0.2v-0.2c0-1.8-0.6-3.4-1.6-4.8l-0.7,2.5
	c-0.1,0.4-0.5,0.7-1,0.7c-0.1,0-0.2,0-0.3,0c-0.5-0.2-0.8-0.7-0.7-1.2l1.2-4.1c0-0.3-0.2-0.6-0.5-0.8c-2.6-1.3-5.7-1.3-8.3,0
	C6.5,3.1,6.4,3.5,6.3,3.8l1.2,4.1c0.2,0.5-0.2,1.1-0.7,1.2c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8-0.3-1-0.7L4.9,6c-1,1.4-1.6,3-1.6,4.8V11
	H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h2v1c0,2.2,0.9,4.2,2.4,5.5c-0.2,1.4-1.1,2.6-2.5,3c-2.5,0.7-4.4,2.9-5,5.7c-0.1,0.5,0,0.9,0.3,1.3
	C0.6,29.8,1,30,1.5,30h15.4C15.1,28.2,14,25.7,14,23z"
                      />
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">
                  Gestionar Analistas
                </div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1uk9c8u for-select"
                tabIndex="0"
                id="cuenta"
                onClick={() => isSelected("cuenta")}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="CogIcon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Cuenta</div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <button
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1uk9c8u"
                tabIndex="0"
                onClick={() => Salir()}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="LockIcon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-log-out"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Salir</div>
              </button>
            </li>
          </>
        );
      } else if (rol == 2) {
        return (
          <>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-129bs90 for-select"
                tabIndex="0"
                id="dashboard"
                href="/"
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ChartBarIcon"
                  >
                    <svg
                      viewBox="0 0 20 18"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0.399902 10.2C0.399902 9.88175 0.52633 9.57652 0.751374 9.35148C0.976418 9.12644 1.28164 9.00001 1.5999 9.00001H3.9999C4.31816 9.00001 4.62339 9.12644 4.84843 9.35148C5.07347 9.57652 5.1999 9.88175 5.1999 10.2V16.2C5.1999 16.5183 5.07347 16.8235 4.84843 17.0485C4.62339 17.2736 4.31816 17.4 3.9999 17.4H1.5999C1.28164 17.4 0.976418 17.2736 0.751374 17.0485C0.52633 16.8235 0.399902 16.5183 0.399902 16.2V10.2ZM7.5999 5.40001C7.5999 5.08175 7.72633 4.77652 7.95137 4.55148C8.17642 4.32643 8.48164 4.20001 8.7999 4.20001H11.1999C11.5182 4.20001 11.8234 4.32643 12.0484 4.55148C12.2735 4.77652 12.3999 5.08175 12.3999 5.40001V16.2C12.3999 16.5183 12.2735 16.8235 12.0484 17.0485C11.8234 17.2736 11.5182 17.4 11.1999 17.4H8.7999C8.48164 17.4 8.17642 17.2736 7.95137 17.0485C7.72633 16.8235 7.5999 16.5183 7.5999 16.2V5.40001ZM14.7999 1.80001C14.7999 1.48175 14.9263 1.17652 15.1514 0.951478C15.3764 0.726434 15.6816 0.600006 15.9999 0.600006H18.3999C18.7182 0.600006 19.0234 0.726434 19.2484 0.951478C19.4735 1.17652 19.5999 1.48175 19.5999 1.80001V16.2C19.5999 16.5183 19.4735 16.8235 19.2484 17.0485C19.0234 17.2736 18.7182 17.4 18.3999 17.4H15.9999C15.6816 17.4 15.3764 17.2736 15.1514 17.0485C14.9263 16.8235 14.7999 16.5183 14.7999 16.2V1.80001Z"></path>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Dashboard</div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1uk9c8u for-select"
                tabIndex="0"
                id="pedidos"
                onClick={() => isSelected("pedidos")}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="UsersIcon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <title>Order_history</title>
                      <g id="Order_history">
                        <path d="M251.2305,448H70.7735a150.4432,150.4432,0,0,0,32.2656-93.5391V64H381.4336V217.1719a8,8,0,0,0,16,0V56a7.9979,7.9979,0,0,0-8-8H95.0391a7.9979,7.9979,0,0,0-8,8V354.4609a134.7126,134.7126,0,0,1-39.711,95.8829A7.9993,7.9993,0,0,0,52.9844,464H251.2305a8,8,0,0,0,0-16Z" />
                        <path d="M333.9961,148.7656h-183.52a8,8,0,0,0,0,16h183.52a8,8,0,0,0,0-16Z" />
                        <path d="M341.9961,210.9688a7.9979,7.9979,0,0,0-8-8h-183.52a8,8,0,1,0,0,16h183.52A7.9979,7.9979,0,0,0,341.9961,210.9688Z" />
                        <path d="M262.2305,265.1719a7.9979,7.9979,0,0,0-8-8H150.4766a8,8,0,0,0,0,16H254.2305A7.9979,7.9979,0,0,0,262.2305,265.1719Z" />
                        <path d="M150.4766,311.375a8,8,0,1,0,0,16h65.2539a8,8,0,0,0,0-16Z" />
                        <path d="M436.7266,287.4609A103.32,103.32,0,0,0,261.7905,342.873l-6.3569-6.3574a7.9991,7.9991,0,0,0-11.3125,11.3125L262.53,366.2363a8.026,8.026,0,0,0,11.3232,0l18.4126-18.4082a7.9991,7.9991,0,0,0-11.3125-11.3125l-1.8169,1.8164a87.3378,87.3378,0,1,1,22.6568,84.0664,7.9991,7.9991,0,0,0-11.3125,11.3125,103.413,103.413,0,0,0,146.2461-146.25Z" />
                        <path d="M363.6055,291.32a7.9979,7.9979,0,0,0-8,8v61.2656a8.115,8.115,0,0,0,2.3506,5.6641l28.9931,28.9922A7.9991,7.9991,0,0,0,398.2617,383.93l-26.6562-26.6563V299.32A7.9979,7.9979,0,0,0,363.6055,291.32Z" />
                      </g>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Pedidos</div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-129bs90 for-select"
                tabIndex="0"
                id="garantias"
                onClick={() => isSelected("garantias")}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ChartBarIcon"
                  >
                    <svg
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <title>Artboard 3</title>
                      <path d="M5,1V3H1V20a3,3,0,0,0,3,3H19.24A3.77,3.77,0,0,0,23,19.24V1ZM3,20V5H5V20a1,1,0,0,1-2,0Zm18-.76A1.76,1.76,0,0,1,19.24,21H6.82A3,3,0,0,0,7,20V3H21Z" />
                      <rect x="11" y="5" width="8" height="2" />
                      <rect x="9" y="9" width="10" height="2" />
                      <rect x="9" y="13" width="10" height="2" />
                      <rect x="9" y="17" width="10" height="2" />
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Garantías</div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1uk9c8u for-select"
                tabIndex="0"
                id="productos"
                onClick={() => isSelected("productos")}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ShoppingBagIcon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Productos</div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1uk9c8u for-select"
                tabIndex="0"
                id="revisiones"
                onClick={() => isSelected("revisiones")}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="UserIcon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-eye"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Revisiones</div>
              </a>
            </li>

            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1uk9c8u for-select"
                tabIndex="0"
                id="cuenta"
                onClick={() => isSelected("cuenta")}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="CogIcon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Cuenta</div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <button
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1uk9c8u"
                tabIndex="0"
                onClick={() => Salir()}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="LockIcon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-log-out"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Salir</div>
              </button>
            </li>
          </>
        );
      } else if (rol == 3) {
        return (
          <>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-129bs90 for-select"
                tabIndex="0"
                href="/"
                id="dashboard"
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ChartBarIcon"
                  >
                    <svg
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <title>Artboard 3</title>
                      <path d="M5,1V3H1V20a3,3,0,0,0,3,3H19.24A3.77,3.77,0,0,0,23,19.24V1ZM3,20V5H5V20a1,1,0,0,1-2,0Zm18-.76A1.76,1.76,0,0,1,19.24,21H6.82A3,3,0,0,0,7,20V3H21Z" />
                      <rect x="11" y="5" width="8" height="2" />
                      <rect x="9" y="9" width="10" height="2" />
                      <rect x="9" y="13" width="10" height="2" />
                      <rect x="9" y="17" width="10" height="2" />
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Garantías</div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1uk9c8u for-select"
                tabIndex="0"
                id="pedidos"
                onClick={() => isSelected("pedidos")}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="UsersIcon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <title>Order_history</title>
                      <g id="Order_history">
                        <path d="M251.2305,448H70.7735a150.4432,150.4432,0,0,0,32.2656-93.5391V64H381.4336V217.1719a8,8,0,0,0,16,0V56a7.9979,7.9979,0,0,0-8-8H95.0391a7.9979,7.9979,0,0,0-8,8V354.4609a134.7126,134.7126,0,0,1-39.711,95.8829A7.9993,7.9993,0,0,0,52.9844,464H251.2305a8,8,0,0,0,0-16Z" />
                        <path d="M333.9961,148.7656h-183.52a8,8,0,0,0,0,16h183.52a8,8,0,0,0,0-16Z" />
                        <path d="M341.9961,210.9688a7.9979,7.9979,0,0,0-8-8h-183.52a8,8,0,1,0,0,16h183.52A7.9979,7.9979,0,0,0,341.9961,210.9688Z" />
                        <path d="M262.2305,265.1719a7.9979,7.9979,0,0,0-8-8H150.4766a8,8,0,0,0,0,16H254.2305A7.9979,7.9979,0,0,0,262.2305,265.1719Z" />
                        <path d="M150.4766,311.375a8,8,0,1,0,0,16h65.2539a8,8,0,0,0,0-16Z" />
                        <path d="M436.7266,287.4609A103.32,103.32,0,0,0,261.7905,342.873l-6.3569-6.3574a7.9991,7.9991,0,0,0-11.3125,11.3125L262.53,366.2363a8.026,8.026,0,0,0,11.3232,0l18.4126-18.4082a7.9991,7.9991,0,0,0-11.3125-11.3125l-1.8169,1.8164a87.3378,87.3378,0,1,1,22.6568,84.0664,7.9991,7.9991,0,0,0-11.3125,11.3125,103.413,103.413,0,0,0,146.2461-146.25Z" />
                        <path d="M363.6055,291.32a7.9979,7.9979,0,0,0-8,8v61.2656a8.115,8.115,0,0,0,2.3506,5.6641l28.9931,28.9922A7.9991,7.9991,0,0,0,398.2617,383.93l-26.6562-26.6563V299.32A7.9979,7.9979,0,0,0,363.6055,291.32Z" />
                      </g>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Pedidos</div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1uk9c8u for-select"
                tabIndex="0"
                id="productos"
                onClick={() => isSelected("productos")}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ShoppingBagIcon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Productos</div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1uk9c8u for-select"
                tabIndex="0"
                id="revisiones"
                onClick={() => isSelected("revisiones")}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="UserIcon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-eye"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Revisiones</div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <a
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1uk9c8u for-select"
                tabIndex="0"
                id="cuenta"
                onClick={() => isSelected("cuenta")}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="CogIcon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Cuenta</div>
              </a>
            </li>
            <li className="MuiListItem-root MuiListItem-padding css-19wsrat">
              <button
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1uk9c8u"
                tabIndex="0"
                onClick={() => Salir()}
              >
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="LockIcon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-log-out"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </svg>
                </span>
                <div className="MuiBox-root css-i9gxme">Salir</div>
              </button>
            </li>
          </>
        );
      }
    }

    return (
      <div
        className="MuiDrawer-root MuiDrawer-docked css-1tu59u4 "
        hidden
        id="AsideMenu"
      >
        <div className="MuiPaper-root MuiPaper-elevation MuiPaper-elevation0 MuiDrawer-paper MuiDrawer-paperAnchorLeft MuiDrawer-paperAnchorDockedLeft css-1o9ypuc">
          <div className="MuiBox-root css-1g4yje1">
            <div>
              <div className="MuiBox-root css-19kzrtu">
                <a href="http://localhost:3000/">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    xmlns="http://www.w3.org/2000/svg"
                    className="css-2tcqb0"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.6744 4.50247L31.9038 9.66459C32.117 9.78381 32.2944 9.95738 32.4178 10.1674C32.5413 10.3775 32.6064 10.6164 32.6064 10.8597C32.6064 11.1031 32.5413 11.342 32.4178 11.5521C32.2944 11.7621 32.117 11.9357 31.9038 12.0549L22.6745 17.2172C22.0854 17.5467 21.4212 17.7198 20.7456 17.7198C20.0698 17.7198 19.4056 17.5467 18.8166 17.2172L9.5873 12.0549C9.37415 11.9357 9.1967 11.7621 9.0732 11.5521C8.94971 11.342 8.8846 11.1031 8.8846 10.8597C8.8846 10.6164 8.94971 10.3775 9.0732 10.1674C9.1967 9.95738 9.37415 9.78381 9.5873 9.66459L18.8166 4.50247C19.4056 4.17301 20.0698 4 20.7456 4C21.4212 4 22.0854 4.17301 22.6744 4.50247Z"
                      fill="#5048E5"
                    ></path>
                    <path
                      opacity="0.7"
                      d="M22.6244 9.34853L35.8422 16.7415C36.0554 16.8607 36.2328 17.0343 36.3563 17.2443C36.4798 17.4544 36.5449 17.6933 36.5449 17.9366C36.5449 18.18 36.4798 18.419 36.3563 18.629C36.2328 18.8391 36.0554 19.0126 35.8422 19.1319L22.6244 26.5248C22.0355 26.8541 21.3712 27.0272 20.6956 27.0272C20.0199 27.0272 19.3557 26.8541 18.7667 26.5248L5.54893 19.1319C5.33578 19.0126 5.15833 18.8391 5.03483 18.629C4.91133 18.419 4.84623 18.18 4.84623 17.9366C4.84623 17.6933 4.91133 17.4544 5.03483 17.2443C5.15833 17.0343 5.33578 16.8607 5.54893 16.7415L18.7667 9.34853C19.3557 9.01916 20.0199 8.84615 20.6956 8.84615C21.3712 8.84615 22.0355 9.01916 22.6244 9.34853Z"
                      fill="#5048E5"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M22.9257 14.1939L41.2984 24.4703C41.5113 24.5894 41.6884 24.7626 41.8117 24.9724C41.935 25.182 42 25.4206 42 25.6636C42 25.9065 41.935 26.1451 41.8117 26.3548C41.6884 26.5645 41.5113 26.7378 41.2984 26.8568L22.9257 37.1329C22.3377 37.4618 21.6745 37.6346 21 37.6346C20.3254 37.6346 19.6623 37.4618 19.0743 37.1329L0.701542 26.8568C0.488743 26.7378 0.311581 26.5645 0.188286 26.3548C0.0649948 26.1451 0 25.9065 0 25.6636C0 25.4206 0.0649948 25.182 0.188286 24.9724C0.311581 24.7626 0.488743 24.5894 0.701542 24.4703L19.0743 14.1939C19.6623 13.8651 20.3254 13.6923 21 13.6923C21.6745 13.6923 22.3377 13.8651 22.9257 14.1939Z"
                      fill="#5048E5"
                    ></path>
                  </svg>
                </a>
              </div>
              <div className="MuiBox-root css-gajhq5">
                <div className="MuiBox-root css-1ptzaww">
                  <div>
                    <h6 className="MuiTypography-root MuiTypography-subtitle1 css-rl5iwp">
                      {cookies.get("nombre") + " " + cookies.get("ap_paterno")}
                    </h6>
                    <p className="MuiTypography-root MuiTypography-body2 css-upja9j">
                      {rolname}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="MuiDivider-root MuiDivider-fullWidth css-d5e998" />
            <div className="MuiBox-root css-i9gxme">{OptionsByRol()}</div>
            <hr className="MuiDivider-root MuiDivider-fullWidth css-1xqczjx" />
          </div>
        </div>
      </div>
    );
  }
}
export default AsideMenu;
