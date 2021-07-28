
module.exports = (data) =>{
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Print</title>
	<style>
			p{
				font-family: 'Times New Roman', Times, serif;
			}
			.center-align {
				text-align: center;
			}
			.left-align {
				text-align: center;
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
	</style>
</head>
<body>
${data}
</body>
</html>`
}