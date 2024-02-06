--
-- Database: `ecomm`
--
-- --------------------------------------------------------
--
-- Table structure for table `carts`
--
CREATE TABLE `carts` (
	`id` int(5) NOT NULL COMMENT 'PK',
	`sessionId` varchar(255) NOT NULL COMMENT 'Session ID in which cart is created',
	`cartId` varchar(255) NOT NULL COMMENT 'cart unique ID',
	`userId` int(5) NOT NULL COMMENT 'UserID',
	`isActive` char(1) NOT NULL DEFAULT 'A' COMMENT 'A: Active, N: Not active',
	`timeStamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Time of record creation'
) --
-- Dumping data for table `carts`
--
INSERT INTO `carts` ( `sessionId`, `cartId`, `userId`) VALUES
( '1c88658f-8b65-4d1b-b41a-12c2f71f06f9', '2492d551-1e07-43f2-ac16-f7bd87a71fdf', 123 ),
( '1c88658f-8b65-4d1b-b41a-12c2f71f06f9', 'a5dc21b6-538c-4a3c-94af-8a7c736406f7', 123 );

-- --------------------------------------------------------
--
-- Table structure for table `items`
--
CREATE TABLE `items` (
	`id` int(5) NOT NULL COMMENT 'PK',
	`cartId` varchar(255) NOT NULL COMMENT 'Cart ID',
	`productId` int(5) NOT NULL COMMENT 'Product ID',
	`productQty` int(2) NOT NULL DEFAULT 1 COMMENT 'Product quantity',
	`timeStamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Time of record creation'
)

--
-- Dumping data for table `items`
--
INSERT INTO `items` ( `cartId`, `productId`, `productQty` ) VALUES
( '2492d551-1e07-43f2-ac16-f7bd87a71fdf', 2, 3 ),
( '2492d551-1e07-43f2-ac16-f7bd87a71fdf', 14, 1 ),
( '2492d551-1e07-43f2-ac16-f7bd87a71fdf', 9, 1 );

-- --------------------------------------------------------
--
-- Table structure for table `payments`
--
CREATE TABLE `payments` (
	`id` int(5) NOT NULL COMMENT 'PK',
	`sessionId` varchar(255) NOT NULL COMMENT 'Session ID',
	`userId` int(5) NOT NULL COMMENT 'User ID',
	`cartId` varchar(255) NOT NULL COMMENT 'Cart ID',
	`paymentId` varchar(255) NOT NULL COMMENT 'Payment ID',
	`amount` int(10) NOT NULL COMMENT 'Amount',
	`status` char(1) NOT NULL DEFAULT 'N' COMMENT 'Has paid or not, A: Paid, N: not paid',
	`timeStamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Time of record creation'
)

--
-- Dumping data for table `payments`
--
INSERT INTO `payments` ( `sessionId`, `userId`, `cartId`, `paymentId`, `amount` ) VALUES
( '1c88658f-8b65-4d1b-b41a-12c2f71f06f9', 123, '2492d551-1e07-43f2-ac16-f7bd87a71fdf', '1231707148654028', 5448 );

-- --------------------------------------------------------
--
-- Table structure for table `products`
--
CREATE TABLE `products` (
	`id` int(5) NOT NULL COMMENT 'Product ID',
	`title` varchar(255) NOT NULL COMMENT 'Name',
	`price` int(10) NOT NULL COMMENT 'Price',
	`thumbnail` varchar(255) NOT NULL COMMENT 'Image code',
	`timeStamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Time of record creation'
)

--
-- Dumping data for table `products`
--
INSERT INTO`products` (`title`, `price`, `thumbnail`) VALUES
( 'Iphone 9', 549, 'IMAGE1' ),
( 'Iphone X', 899, 'IMAGE2' ),
( 'Samsung Universe 9', 80, 'IMAGE3' ),
( 'Oppo f19', 1671, 'IMAGE4' ),
( 'Huawei P30', 5515, 'IMAGE5' ),
( 'Motorola', 4190, 'IMAGE6' ),
( 'IBOOK Infinix', 65, 'IMAGE7' ),
( 'Perfume Oil', 487, 'IMAGE8' ),
( 'Brown perfume', 2205, 'IMAGE9' ),
( 'Fog scent', 100, 'IMAGE10' ),
( 'Tree Oil 30ml', 152, 'IMAGE11' ),
( 'Oil Moisturizer', 135, 'IMAGE12' ),
( 'Skin Beauty Serum', 387, 'IMAGE13' ),
( 'Daal Masoor 1000gms', 546, 'IMAGE14' ),
( 'Flying wood bird', 45, 'IMAGE15' ),
( 'Tree Oil', 8549, 'IMAGE16' ),
( 'Handcfraft Chinese Style', 4, 'IMAGE17' ),
( 'Gulab Powder', 11, 'IMAGE18' ),
( 'Plant Hanger', 588, 'IMAGE19' ),
( '3D Art Lamp', 220, 'IMAGE20' ),
( 'Hyalurinic Acid', 322, 'IMAGE21' ),
( 'Cereals Mulsi Fruit', 7400, 'IMAGE22' ),
( 'Orange Essence', 6166, 'IMAGE23' ),
( 'IsoPropyl', 3, 'IMAGE24' ),
( 'Microsoft Surface', 1129, 'IMAGE25' ),
( 'Samsum=ng Galaxy', 517, 'IMAGE26' ),
( 'Eau De Perfume', 204, 'IMAGE27' );

-- --------------------------------------------------------
--
-- Table structure for table `sessions`
--
CREATE TABLE `sessions` (
	`id` int(5) NOT NULL COMMENT 'PK for session table',
	`sessionId` varchar(255) NOT NULL COMMENT 'UUID',
	`userId` int(5) NOT NULL COMMENT 'User ID to store',
	`loginStatus` tinyint(1) DEFAULT NULL,
	`isExpired` char(1) NOT NULL DEFAULT 'N' COMMENT 'N: No, Y: Yes',
	`timeStamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Time of record creation'
)

--
-- Dumping data for table `sessions`
--
INSERT INTO `sessions` ( `sessionId`, `userId`, `loginStatus` ) VALUES
( '1c88658f-8b65-4d1b-b41a-12c2f71f06f9', 123, 0 ),
( '174e66b8-df70-4bcd-bfe2-1bd0599e12d5', 123, 0 ),
( 'd6ec231b-741c-4673-ab52-9b394c00715f', 123, 0 );

-- --------------------------------------------------------
--
-- Table structure for table `shipping`
--
CREATE TABLE `shipping` (
	`id` int(5) NOT NULL COMMENT 'PK',
	`userId` int(10) NOT NULL COMMENT 'User ID',
	`shipAddress` varchar(255) NOT NULL COMMENT 'Shipping Address',
	`billAddress` varchar(255) NOT NULL COMMENT 'Billing Address',
	`timeStamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Time f record creation'
)

--
-- Dumping data for table `shipping`
--
INSERT INTO `shipping` ( `userId`, `shipAddress`, `billAddress` ) VALUES
( 123, 'd5', 'd5' );

-- --------------------------------------------------------
--
-- Table structure for table `ships`
--
CREATE TABLE `ships` (
	`id` int(5) NOT NULL COMMENT 'PK',
	`userId` int(10) NOT NULL COMMENT 'User ID',
	`cartId` varchar(255) NOT NULL COMMENT 'Cart ID',
	`paymentId` varchar(255) NOT NULL COMMENT 'Payment ID',
	`shippingId` varchar(255) NOT NULL COMMENT 'Shipping address ID',
	`inTransit` char(1) NOT NULL DEFAULT 'A' COMMENT 'A: Intransit, F: Finsihed',
	`timeStamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Time of record creation'
)

--
-- Dumping data for table `ships`
--
INSERT INTO `ships` ( `userId`, `cartId`, `paymentId`, `shippingId` ) VALUES
( 123, '2492d551-1e07-43f2-ac16-f7bd87a71fdf', '1231707148654028', '1', 'A' );

--
-- Indexes for dumped tables
--
--
-- Indexes for table `carts`
--
ALTER TABLE
	`carts`
ADD
	PRIMARY KEY (`id`),
ADD
	UNIQUE KEY `cartId` (`cartId`);

--
-- Indexes for table `items`
--
ALTER TABLE
	`items`
ADD
	PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE
	`payments`
ADD
	PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE
	`products`
ADD
	PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE
	`sessions`
ADD
	PRIMARY KEY (`id`),
ADD
	UNIQUE KEY `sessionId` (`sessionId`);

--
-- Indexes for table `shipping`
--
ALTER TABLE
	`shipping`
ADD
	PRIMARY KEY (`id`);

--
-- Indexes for table `ships`
--
ALTER TABLE
	`ships`
ADD
	PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--
--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE
	`carts`
MODIFY
	`id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'PK',
	AUTO_INCREMENT = 9;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE
	`items`
MODIFY
	`id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'PK',
	AUTO_INCREMENT = 39;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE
	`payments`
MODIFY
	`id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'PK',
	AUTO_INCREMENT = 78;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE
	`products`
MODIFY
	`id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'Product ID',
	AUTO_INCREMENT = 28;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE
	`sessions`
MODIFY
	`id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'PK for session table',
	AUTO_INCREMENT = 149;

--
-- AUTO_INCREMENT for table `shipping`
--
ALTER TABLE
	`shipping`
MODIFY
	`id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'PK',
	AUTO_INCREMENT = 2;

--
-- AUTO_INCREMENT for table `ships`
--
ALTER TABLE
	`ships`
MODIFY
	`id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'PK',
	AUTO_INCREMENT = 17;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;