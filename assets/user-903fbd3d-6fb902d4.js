const s={form:{actions:{submit:"Change password"},oldPassword:{label:"Old password"},newPassword:{label:"New password"},confirmPassword:{label:"Confirm password is required"}},messages:{success:"Your password was successfully changed.",validation:{oldPassword:"Old password is required",newPassword:"New password is required",confirmPassword:"Confirm password",mustMatch:"Passwords must match"}},title:"Change Password"},e={messages:{success:"Email sent sucessfully",validation:{email:"Email is required"}},form:{actions:{submit:"Email me"},email:{label:"Your email",placeholder:"john.doe.at.example.com"}},title:"Forget Password"},a={title:"Register first user",errors:{notFirstUser:"First admin has already signed up. If this was not expected, please contact developer team"},login:{messages:{error:"Automatic login failed. Redirecting to login page for manual login"}},signup:{messages:{error:"Error signing up first user",success:"Succefully added first admin user. Automatically logging in ..."}}},r={form:{actions:{submit:"Sign in"},email:{label:"Your email",placeholder:"john.doe.at.example.com"},password:{label:"Your password"}},instructions:"Enter your credentials to continue.",links:{forgotPassword:"Forgot password",signup:"Sign up"},messages:{success:"Logged in successfully.",validation:{email:"Email is required",password:"Password is required"}},title:"Login"},i={message:"Successfully logged out"},o={form:{actions:{submit:"Create my account"},confirmation:{label:"Confirm your password"},email:{label:"Your email",placeholder:"john.doe.at.example.com"},password:{label:"Your password"},confirmPassword:{label:"Confirm password"}},links:{forgotPassword:"Forgot password",login:"Login"},messages:{success:"Signed up successfully.",validation:{email:"Email is required",password:"Password is required",confirmPassword:"ConfirmPassword is required"}},title:"Register"},t={signin:"Signin",signup:"Signup"},n={form:{actions:{submit:"Reset password"},newPassword:{label:"New password"},confirmPassword:{label:"Confirm password is required"}},messages:{success:"Reset password successfully",validation:{newPassword:"New password is required",confirmPassword:"Confirm password is required"}},title:"Reset Password"},l={profile:"Profile",logout:"Logout"},d={messages:{app:"App is required",email:"Email is required",validEmail:"Email must be a valid email",requiredField:"This field is required",role:"Role is required",passwordValidation:"Password must contain at least 8 characters, including a number, a lowercase and an uppercase",mustMatch:"Passwords must match"}},u={accept:{message:"Invitation already accepted"},form:{actions:{cancel:"Cancel",submit:"Invite user"},app:{label:"App",placeholder:"Select app"},email:{label:"Email",placeholder:"john.doe.at.example.com"},role:{label:"Role",placeholder:"Select role"}},messages:{invite:{success:"Successfully invited user",error:"Error inviting user"},resend:{success:"Successfully resent invitation",error:"Error resending invitation"},revoke:{success:"Successfully revoked invitation",error:"Error revoking invitation"}},modal:{button:{label:"Invite user"},dialog:{header:"Invitation form"}},title:"Invitation",actions:{resend:"Resend",revoke:"Revoke"},confirmation:{header:"Confirmation"},confirm:{resend:{message:"Are you sure you want to resend?"},revoke:{message:"Are you sure you want to revoke?"}}},c={errors:{errorFetchingInvitation:"Invalid token. Please contact your administrator.",errorAcceptingInvitation:"Error accepting invitation."},table:{defaultColumns:{email:"Email",role:"Role",invitedBy:"Invited by",expiresAt:"Expires at",actions:"Actions",app:"App"},searchPlaceholder:"john.doe.at.example.com",emptyMessage:"Table is empty",title:"Invitations"}},m={changePassword:s,forgetPassword:e,firstUser:a,login:r,logout:i,signup:o,menu:t,resetPassword:n,userMenu:l,validation:d,invitation:u,invitations:c};export{s as changePassword,m as default,a as firstUser,e as forgetPassword,u as invitation,c as invitations,r as login,i as logout,t as menu,n as resetPassword,o as signup,l as userMenu,d as validation};
