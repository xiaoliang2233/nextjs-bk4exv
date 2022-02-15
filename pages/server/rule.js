module.exports = `rule 'move to mobile page' {
  when {
      ctx: Context ctx.inferenceResult == null;
      not(ctx: Context ctx.userData.mobileNumber);
  }
  then {
    modify(ctx, function(){
      ctx.inferenceResult = 'mobile';
    });
  }
}
rule 'move to email page' {
  when {
      ctx: Context ctx.inferenceResult == null;
      ctx: Context ctx.userData.mobileNumber != null;
      not(ctx: Context ctx.userData.email)
  }
  then {
    modify(ctx, function(){
      ctx.inferenceResult = 'email';
    });
  }
}
rule 'move to name page' {
  when {
      ctx: Context ctx.inferenceResult == null;
      ctx: Context ctx.userData.mobileNumber != null;
      ctx: Context ctx.userData.email != null;
      not(ctx: Context ctx.userData.name)
  }
  then {
    modify(ctx, function(){
      ctx.inferenceResult = 'name';
    });
  }
}
`;
