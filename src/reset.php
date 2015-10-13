<?php
	function resete($p5){
		$p5 = trim($p5);
		$p5 = preg_replace('/x /', '', $p5);
		$p5 = preg_replace('/\s+/', ' ', $p5);
		$p5 = str_replace('public', '', $p5);
		$p5 = str_replace('private', '', $p5);
		$p5 = str_replace('void ', 'void-sp°', $p5);
		$p5 = str_replace('boolean ', 'boolean-sp°', $p5);
		$p5 = str_replace('int ', 'int-sp°', $p5);
		$p5 = str_replace('float ', 'float-sp°', $p5);
		$p5 = str_replace('byte ', 'byte-sp°', $p5);
		$p5 = str_replace('char ', 'char-sp°', $p5);
		$p5 = str_replace('long ', 'long-sp°', $p5);
		$p5 = str_replace('double ', 'double-sp°', $p5);
		$p5 = str_replace('color ', 'color-sp°', $p5);
		$p5 = str_replace('PImage ', 'PImage-sp°', $p5);
		$p5 = str_replace('String ', 'String-sp°', $p5);
		$p5 = str_replace('PFont ', 'PFont-sp°', $p5);
		$p5 = str_replace('PVector ', 'PVector-sp°', $p5);
		$p5 = str_replace('Array ', 'Array-sp°', $p5);
		$p5 = str_replace('ArrayList ', 'ArrayList-sp°', $p5);
		$p5 = preg_replace("/\r\n|\n/i", "//°°°//", $p5);
		$p5 = preg_replace("/\r|\t+/i", "", $p5);
		$p5 = preg_replace('/\s+/', '', $p5);
		$p5 = str_replace('<', ' < ', $p5);
		$p5 = str_replace('>', ' > ', $p5);
		$p5 = str_replace('-sp°', ' ', $p5);
		
		return $p5;
	}
?>