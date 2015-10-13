<!DOCTYPE html>

<html>
<head>
    <title>Rosetta</title>
    <meta charset="UTF-8">
    <link href='estilo.css' rel='stylesheet' type='text/css' />
    <link rel=stylesheet href="lib/codemirror.css">
    <link href='sintaxis.css' rel='stylesheet' type='text/css' />
    <script src="jquery.min.js" type="text/javascript"></script>
    <script src="mainli.js" type="text/javascript"></script>
    <script src="lib/codemirror.js"></script>
    <script src="mode/clike/clike.js"></script>
</head>

<body>
	<header>
		<h1>
			<img src="img/logo.png"><img src="img/rosetta.png" id="rosetta" alt="rosetta"><span>alpha 0.1</span>
		</h1>
		<p id="git">
			<a href="https://github.com/ibuioli/rosetta" target="blank">GitHub</a>
		<p>
	</header>

	<div id="con">
		<div id="p5txt" class="txt">p5</div>
		<div id="oftxt" class="txt">of | ofApp.cpp</div>
		<div id="oftxt2" class="txt">of | main.cpp</div>
		<div id="oftxt3" class="txt">of | ofApp.h</div>
		<div id="cp5"><textarea id="p5"></textarea></div>
		<div id="tras"></div>
		<pre id="of" ondblclick="this.focus();this.select()"></pre>
		<pre id="of2" ondblclick="this.focus();this.select()"></pre>
		<pre id="of3" ondblclick="this.focus();this.select()"></pre>

		<div id="boton1" class="botones">
			.cpp
		</div>
		<div id="boton2" class="botones">
			.cpp
		</div>
		<div id="boton3" class="botones">
			.h
		</div>
	</div>

	<div id="refp5">
		<img src="img/p5-logo.png" alt="processing" id="img-r-p5">
	</div>
	<div id="refof">
		<img src="img/of-logo.png" alt="openframeworks" id="img-r-of">
		<p id="copy">&copy; Ignacio Buioli</p>
	</div>

	<script src="programa.js" type="text/javascript"></script>
	<script>
    var editor = CodeMirror.fromTextArea(document.getElementById("p5"), {
      matchBrackets: true,
      mode: "text/x-java"
    });
  </script>
</body>
</html>