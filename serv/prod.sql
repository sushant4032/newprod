-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2020 at 02:50 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prod`
--

-- --------------------------------------------------------

--
-- Table structure for table `daily`
--

CREATE TABLE `daily` (
  `id` int(11) NOT NULL,
  `dn` int(11) NOT NULL,
  `dt` date NOT NULL,
  `val` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `daily`
--

INSERT INTO `daily` (`id`, `dn`, `dt`, `val`) VALUES
(1, 733, '2020-04-02', '{\"g8\":5,\"g10sd\":0,\"g10sm\":0,\"depteast\":0,\"deptwest\":0,\"deptcoal\":0,\"jwalasolid\":0,\"vindhyasolid\":0,\"jyotisolid\":0,\"pawansolid\":0,\"jwalareh\":0,\"vindhyareh\":0,\"jyotireh\":0,\"pawanreh\":0,\"outeasttop\":0,\"outwesttop\":0,\"outeastmid\":0,\"outwestmid\":0,\"outeastdl\":0,\"outwestdl\":0,\"totalsilo\":0,\"wwg10\":0,\"roadg10\":0,\"rwwg10\":0,\"rchpg10\":0,\"dlavl\":0,\"dlutl\":0,\"shvavl\":0,\"shvutl\":0,\"shvutls\":0,\"d85avl\":0,\"d85utl\":0,\"d85utls\":0,\"d120avl\":0,\"d120utl\":0,\"d120utls\":0,\"mp\":0,\"exp\":0,\"rf\":0,\"drillob\":0,\"drillcoal\":0,\"smtrans\":0,\"mctrans\":0,\"chptrans\":0}'),
(2, 732, '2020-04-01', '{\"g8\":5,\"g10sd\":0,\"g10sm\":0,\"depteast\":0,\"deptwest\":0,\"deptcoal\":0,\"jwalasolid\":0,\"vindhyasolid\":0,\"jyotisolid\":0,\"pawansolid\":0,\"jwalareh\":0,\"vindhyareh\":0,\"jyotireh\":0,\"pawanreh\":0,\"outeasttop\":0,\"outwesttop\":0,\"outeastmid\":0,\"outwestmid\":0,\"outeastdl\":0,\"outwestdl\":0,\"totalsilo\":0,\"wwg10\":0,\"roadg10\":0,\"rwwg10\":0,\"rchpg10\":0,\"dlavl\":0,\"dlutl\":0,\"shvavl\":0,\"shvutl\":0,\"shvutls\":0,\"d85avl\":0,\"d85utl\":0,\"d85utls\":0,\"d120avl\":0,\"d120utl\":0,\"d120utls\":0,\"mp\":0,\"exp\":0,\"rf\":0,\"drillob\":0,\"drillcoal\":0,\"smtrans\":0,\"mctrans\":0,\"chptrans\":0}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `daily`
--
ALTER TABLE `daily`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `daily`
--
ALTER TABLE `daily`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
