<?php
	function sacar($TheStr, $sLeft, $sRight){
        $pleft = strpos($TheStr, $sLeft, 0);
        if ($pleft !== false){
                $pright = strpos($TheStr, $sRight, $pleft + strlen($sLeft));
                If ($pright !== false) {
                        return (substr($TheStr, $pleft + strlen($sLeft), ($pright - ($pleft + strlen($sLeft)))));
                }
        }
        return '';
	}
?>