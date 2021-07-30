
module.exports = (data) =>{
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Print</title>
	<style rel="stylesheet">
			body {
				color:black;
				padding:0;
				margin:0;
			}
			div,p{
				font-family: 'Times New Roman', Times, serif;
				padding:0;
				margin:0;
				font-size:12px;
				display:block;
			}
			.center-align {
				text-align: center;
			}
			.left-align {
				text-align: left;
			}
			.right-align {
				text-align: right;
			}
			.line {
				display: block;
			}
			.text {
				display: inline-block;
			}
			.table {
				display:flex;
				flex-direction:row;
				justify-content:space-between;
			}
			@page { size: 58mm 100mm }
	</style>
</head>
<body>
${data}
</body>
</html>`
}
