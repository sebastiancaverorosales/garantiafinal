-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-12-2022 a las 17:16:48
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbgarantias`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADQUIRIR` (IN `Vid_usuario` VARCHAR(11), IN `Vid_producto` VARCHAR(11), IN `Vid_pedido` VARCHAR(11), IN `Vtotal` VARCHAR(11), IN `Vfecha` VARCHAR(11))   INSERT INTO pedido (id_pedido, id_usuario, id_producto, fecha, totalpagar, estado) 
VALUES (Vid_pedido, Vid_usuario, Vid_producto, Vfecha, Vtotal, '0')$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EDITARREVISION` (IN `Vid_revision` VARCHAR(50), IN `Vid_producto` VARCHAR(50), IN `Vid_usuario` VARCHAR(50), IN `Vdescripcion` VARCHAR(300))   UPDATE revisión SET id_producto = Vid_producto, id_usuario = Vid_usuario, descripcion = Vdescripcion WHERE id_revision = Vid_revision$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EDITER` (IN `Vid_usuario` VARCHAR(50), IN `Vcontrasena` VARCHAR(50), IN `Vnombre` VARCHAR(50), IN `Vap_paterno` VARCHAR(50), IN `Vap_materno` VARCHAR(50), IN `Vdni` VARCHAR(21), IN `Vdireccion` VARCHAR(50), IN `Vcelular` VARCHAR(50), IN `Vgenero` CHAR(1), IN `Vfoto` VARCHAR(50))   UPDATE usuario SET contrasena = Vcontrasena, nombre = Vnombre, ap_paterno = Vap_paterno,  ap_materno = Vap_materno, dni = Vdni, direccion = Vdireccion, celular = Vcelular, genero = Vgenero, foto = Vfoto WHERE id_usuario = Vid_usuario$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ELIMINARUSUARIO` (IN `Vid` VARCHAR(50))   DELETE FROM usuario WHERE id_usuario = Vid$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `INSERTARREVISION` (IN `Vid_revision` VARCHAR(50), IN `Vid_producto` VARCHAR(50), IN `Vid_usuario` VARCHAR(50), IN `Vdescripcion` VARCHAR(300))   INSERT INTO REVISIÓN (id_revision, id_producto, id_usuario, descripcion) VALUES (Vid_revision, Vid_producto, Vid_usuario, Vdescripcion)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LISTARANALISTA` ()   SELECT * FROM usuario WHERE id_rol = 2$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LISTARCLIENTES` ()   SELECT * FROM usuario WHERE id_rol = 3$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LISTARGARANTIAS` ()   SELECT id_garantia, producto.nombre, id_usuario, tipogarantia.nombre AS 'tipo', fechavencimiento, estadorenovar FROM GARANTIA
    INNER JOIN producto ON garantia.id_producto = producto.id_producto
    INNER JOIN tipogarantia ON tipogarantia.id_tipogarantia = garantia.id_tipogarantia$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LISTARGARANTIASUSUARIO` (IN `Vid` VARCHAR(11))   SELECT id_garantia, producto.nombre, id_usuario, tipogarantia.nombre AS 'tipo', fechavencimiento, estadorenovar FROM GARANTIA
    INNER JOIN producto ON garantia.id_producto = producto.id_producto
    INNER JOIN tipogarantia ON tipogarantia.id_tipogarantia = garantia.id_tipogarantia
    WHERE garantia.id_usuario = Vid$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LISTARPEDIDOS` ()   SELECT id_pedido, id_usuario, producto.nombre AS 'producto', fecha, totalpagar, estado FROM pedido
    INNER JOIN producto ON producto.id_producto = pedido.id_producto$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LISTARPEDIDOSUSUARIO` (IN `Vid` VARCHAR(11))   SELECT id_pedido, id_usuario, producto.nombre AS 'producto', fecha, totalpagar, estado FROM pedido
    INNER JOIN producto ON producto.id_producto = pedido.id_producto
    WHERE pedido.id_usuario = Vid$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LISTARPRODUCTOS` ()   SELECT producto.id_producto, producto.nombre, descripcion, stock, precio, marca.nombre AS 'marca', categoriaproducto.nombre AS 'categoria' FROM producto 
	INNER JOIN categoriaproducto ON producto.id_categoria = categoriaproducto.id_categoria 
    INNER JOIN marca ON producto.id_marca = marca.id_marca$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LISTARREVISION` ()   SELECT id_revision, producto.nombre AS 'productonombre', usuario.nombre, usuario.ap_paterno, usuario.ap_materno, revisión.descripcion FROM revisión 
    INNER JOIN producto ON revisión.id_producto = producto.id_producto
    INNER JOIN usuario ON revisión.id_usuario = usuario.id_usuario$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LISTARREVISIONUSUARIO` (IN `Vid` VARCHAR(11))   SELECT id_revision, producto.nombre AS 'productonombre', usuario.nombre, usuario.ap_paterno, usuario.ap_materno, revisión.descripcion FROM revisión 
    INNER JOIN producto ON revisión.id_producto = producto.id_producto
    INNER JOIN usuario ON revisión.id_usuario = usuario.id_usuario
    WHERE revisión.id_usuario = Vid$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LISTARUSUARIO` ()   SELECT * FROM usuario$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LOGIN` (IN `login` VARCHAR(50))   SELECT contrasena, nombre, ap_paterno, ap_materno, dni, direccion, celular, id_rol, foto 
	FROM usuario
	WHERE id_usuario = login$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `REGISTER` (IN `Vid_usuario` VARCHAR(50), IN `Vcontrasena` VARCHAR(50), IN `Vnombre` VARCHAR(50), IN `Vap_paterno` VARCHAR(50), IN `Vap_materno` VARCHAR(50), IN `Vdni` VARCHAR(21), IN `Vdireccion` VARCHAR(50), IN `Vcelular` VARCHAR(50), IN `Vrol` INT, IN `Vgenero` CHAR(1), IN `Vfoto` VARCHAR(50))   INSERT INTO usuario (id_usuario, contrasena, nombre, ap_paterno, ap_materno, dni, direccion, celular, id_rol, genero, foto) VALUES (Vid_usuario, Vcontrasena, Vnombre, Vap_paterno, Vap_materno, Vdni, Vdireccion, Vcelular, Vrol, Vgenero, Vfoto)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `REPORTES` ()   SELECT * FROM GARANTIA JOIN PEDIDO$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoriaproducto`
--

CREATE TABLE `categoriaproducto` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoriaproducto`
--

INSERT INTO `categoriaproducto` (`id_categoria`, `nombre`) VALUES
(1, 'Antivirus'),
(2, 'Computadora'),
(3, 'Periféricos'),
(4, 'Teléfono'),
(5, 'Auriculares'),
(6, 'Carro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `garantia`
--

CREATE TABLE `garantia` (
  `id_garantia` int(11) NOT NULL,
  `id_producto` int(7) DEFAULT NULL,
  `id_usuario` varchar(50) DEFAULT NULL,
  `id_tipogarantia` int(7) DEFAULT NULL,
  `fechavencimiento` date DEFAULT NULL,
  `estadorenovar` char(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `garantia`
--

INSERT INTO `garantia` (`id_garantia`, `id_producto`, `id_usuario`, `id_tipogarantia`, `fechavencimiento`, `estadorenovar`) VALUES
(1, 1, '1', 1, '2022-10-12', '0'),
(2, 2, '1', 2, '2022-11-30', '0'),
(3, 3, '1', 2, '2022-11-01', '1'),
(4, 3, '1', 2, '2022-11-02', '1'),
(5, 3, 'MJackson279', 1, '2023-12-01', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `id_marca` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`id_marca`, `nombre`) VALUES
(1, 'AVAST'),
(2, 'PANDA'),
(3, 'MacAfee'),
(4, 'ESET'),
(5, 'Kapersky'),
(6, 'Beats'),
(7, 'Toyota');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario` varchar(50) DEFAULT NULL,
  `id_producto` int(7) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `totalpagar` int(7) DEFAULT NULL,
  `estado` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `id_usuario`, `id_producto`, `fecha`, `totalpagar`, `estado`) VALUES
(1, '1', 1, '2022-10-14', 200, '1'),
(2, '1', 2, '2022-10-11', 220, '2'),
(3, '1', 5, '2022-11-27', 499, '2'),
(4, '1', 2, '2022-11-28', 200, '0'),
(5, '1', 3, '2022-11-28', 190, '0'),
(6, '1', 5, '2022-11-28', 120, '0'),
(7, '1', 4, '2022-11-28', 2500, '0'),
(8, '1', 3, '2022-11-28', 190, '0'),
(9, '1', 1, '2022-11-30', 150, '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `stock` int(7) DEFAULT NULL,
  `precio` int(7) DEFAULT NULL,
  `id_marca` int(7) DEFAULT NULL,
  `id_categoria` int(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `descripcion`, `stock`, `precio`, `id_marca`, `id_categoria`) VALUES
(1, 'Antivirus Avast', 'Antivirus Deluxe Edition', 99, 150, 1, 1),
(2, 'Antivirus Panda', 'Antivirus Deluxe Edition', 100, 120, 2, 1),
(3, 'Antivirus MacAfee', 'Antivirus Estandar Edition', 119, 190, 3, 1),
(4, 'Computadora Gamer', 'Es Gamer', 10, 2500, 5, 4),
(5, 'Audífonos', 'Se escucha chévere.', 40, 120, 6, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `revisión`
--

CREATE TABLE `revisión` (
  `id_revision` int(11) NOT NULL,
  `id_producto` int(7) DEFAULT NULL,
  `id_usuario` varchar(50) DEFAULT NULL,
  `descripcion` varchar(300) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `revisión`
--

INSERT INTO `revisión` (`id_revision`, `id_producto`, `id_usuario`, `descripcion`) VALUES
(1, 1, '1', 'Se corrigió el buscador de viruses'),
(2, 1, '1', 'Se corrigió la función de quitar viril.'),
(3, 2, 'MJackson279', 'Ya está activado.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Analista'),
(3, 'Cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipogarantia`
--

CREATE TABLE `tipogarantia` (
  `id_tipogarantia` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipogarantia`
--

INSERT INTO `tipogarantia` (`id_tipogarantia`, `nombre`) VALUES
(1, 'Estática'),
(2, 'Dinámica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` varchar(50) NOT NULL,
  `contrasena` varchar(50) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `ap_paterno` varchar(50) DEFAULT NULL,
  `ap_materno` varchar(50) DEFAULT NULL,
  `dni` varchar(21) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `celular` varchar(21) DEFAULT NULL,
  `id_rol` int(1) DEFAULT NULL,
  `genero` char(1) DEFAULT NULL,
  `foto` varchar(300) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `contrasena`, `nombre`, `ap_paterno`, `ap_materno`, `dni`, `direccion`, `celular`, `id_rol`, `genero`, `foto`) VALUES
('1', 'siu', 'Cristiano', 'Ronaldo', 'Dos Santos Aveiro', '7777777', 'Madeira Portugal', '777777777', 3, 'M', 'cristiano_ejemplo.jpg'),
('2', 'cyborg', 'Erling', 'Haaland', '', '1111111', 'Man City', '109278465', 2, 'M', 'haaland.jpg'),
('3', 'leo', 'Lionel', 'Messi', 'Cuccitini', '1111111', 'Paris', '109278465', 1, 'M', 'messi.jpg'),
('MJackson279', 'mjackson', 'Michael', 'Jackson', '', '1233213', 'Av Jackson, California', '123456789', 3, 'M', '79629-jackson10.jpg'),
('NJnr726', 'neyney', 'Neymar', 'Jnr', '', '1010101', 'Sao Paulo', '101010101', 2, 'M', 'verso y coro 1.jpg'),
('RLewandowski356', 'lewan', 'Robert', 'Lewandowski', '', '1000000', 'Av Barcelona - Polonia', '999999999', 2, 'M', 'robertt.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoriaproducto`
--
ALTER TABLE `categoriaproducto`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `garantia`
--
ALTER TABLE `garantia`
  ADD PRIMARY KEY (`id_garantia`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_tipogarantia` (`id_tipogarantia`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`id_marca`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_marca` (`id_marca`);

--
-- Indices de la tabla `revisión`
--
ALTER TABLE `revisión`
  ADD PRIMARY KEY (`id_revision`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `tipogarantia`
--
ALTER TABLE `tipogarantia`
  ADD PRIMARY KEY (`id_tipogarantia`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoriaproducto`
--
ALTER TABLE `categoriaproducto`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `garantia`
--
ALTER TABLE `garantia`
  MODIFY `id_garantia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `marca`
--
ALTER TABLE `marca`
  MODIFY `id_marca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `revisión`
--
ALTER TABLE `revisión`
  MODIFY `id_revision` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipogarantia`
--
ALTER TABLE `tipogarantia`
  MODIFY `id_tipogarantia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `garantia`
--
ALTER TABLE `garantia`
  ADD CONSTRAINT `garantia_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `garantia_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `garantia_ibfk_3` FOREIGN KEY (`id_tipogarantia`) REFERENCES `tipogarantia` (`id_tipogarantia`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoriaproducto` (`id_categoria`),
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`);

--
-- Filtros para la tabla `revisión`
--
ALTER TABLE `revisión`
  ADD CONSTRAINT `revisión_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `revisión_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
