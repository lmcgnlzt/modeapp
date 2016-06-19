<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>MODEFLIP内测通行证</title>
</head>
<body>
    <%block name="content">
% if request.authenticated_userid is None:
        <form action="${request.route_path('auth')}" method="POST">
	        <input type="password" name="password" placeholder="请输入验证码">
	        <button type="submit">提交</button>
	    </form>
% else:
        <!-- <a href="${request.route_path('logout')}">Logout</a> -->
% endif
    </%block>
</body>
</html>