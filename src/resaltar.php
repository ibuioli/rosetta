<?php
function resaltar($data) {
	$data = str_replace("'", " ' ", $data);
	$data = str_replace("\"", " \" ", $data);

	//Claves
	$data = str_replace(array("{","}","[","]",":",".","+","-","=",";"," < "," > ",",","(",")","*","%"), 
		array("<span>{</span>", "<span>}</span>","<span>[</span>", "<span>]</span>",
			"<span>:</span>", "<span>.</span>","<span>+</span>", "<span>-</span>",
			"<span>=</span>", "<span>;</span>", "<span> &lt; </span>", "<span> &gt;</span>","<span>,</span>",
			"<span>(</span>", "<span>)</span>", "<span>*</span>", "<span>%</span>")
		, $data);

	//Nums
	$data = str_replace(array("0","1","2","3","4","5","6","7","8","9"), 
		array("<i>0</i>", "<i>1</i>","<i>2</i>", "<i>3</i>","<i>4</i>", "<i>5</i>",
			"<i>6</i>", "<i>7</i>","<i>8</i>", "<i>9</i>")
		, $data);

	//Vars
	$data = str_replace(array("bool ","int ","float ","char ","unsigned ","double ","long ",
		"void ", "new ", "public ", "private ", "class "), 
		array("<b>bool </b>", "<b>int </b>", "<b>float </b>", "<b>char </b>", "<b>unsigned </b>", "<b>double </b>", "<b>long </b>",
			"<b>void </b>", "<b>new </b>", "<b>public </b>", "<b>private </b>", "<b>class </b>")
		, $data);
	$data = str_replace(" \" ", " \" ", $data, $contar_quote);
	for($i = 0; $i < $contar_quote; $i++){
		$m_quote = sacar($data, " \" ", " \" ");
		$nuevo_quote = "<b>\"".$m_quote."\"</b>";
		$data = str_replace(" \" ".$m_quote." \" ", $nuevo_quote, $data);
	}

	//Lib
	$data = str_replace('#', '#', $data, $contar_lib);
	for($i = 0; $i < $contar_lib; $i++){
		$m_lib = sacar($data, '#', "\n");
		$nuevo_lib = "<a>/°/".$m_lib."</a>\n";
		$data = str_replace("#".$m_lib."\n", $nuevo_lib, $data);
	}
	$data = str_replace("/°/", "#", $data);

	//Comentario
	$data = str_replace('//', '//', $data, $contar_com);
	for($i = 0; $i < $contar_com; $i++){
		$m_com = sacar($data, '//', "\n");
		$nuevo_com = "<u>/°/°".$m_com."</u>\n";
		$data = str_replace("//".$m_com."\n", $nuevo_com, $data);
	}
	$data = str_replace("/°/°", "//", $data);

	//Char
	$data = str_replace(" ' ", " ' ", $data, $contar_q);
	for($i = 0; $i < $contar_q; $i++){
		$m_q = sacar($data, " ' ", " ' ");
		$nuevo_q = "<s>'".$m_q."'</s>";
		$data = str_replace(" ' ".$m_q." ' ", $nuevo_q, $data);
	}

	return $data;
}
?>