<!doctype html>

<html>
	<head>
		<title>VMedia</title>
		<!--<link rel="shortcut icon" href="http://cdn.alsacreations.net/favicon.ico" />-->
		<link rel="stylesheet" type="text/css" href="/contents/css/shared/master.css" />
	</head>
	<body>
		<header>
			<div class="centerDiv">
				<div id="logo"></div>
				<div id="logoTitle"></div>
				<nav>
					<ul>
						<li><span>Home</span></li>
						<li><span>Config</span></li>
					</ul>
				</nav>
			</div>
		</header>
		<main>
			<input type="text" id="omniBar" />
			<%= that.renderBody %>
		</main>
	</body>
</html>