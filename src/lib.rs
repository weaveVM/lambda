use neon::prelude::*;
use crate::utils::ethabiwrapper::{encode_ethabi, decode_ethabi};
mod utils;

fn test_encode(mut cx: FunctionContext) -> JsResult<(JsString)> {
    let input = cx
    .argument::<JsString>(0)? 
    .value(&mut cx);

    let encode_res: String = encode_ethabi(&input).unwrap();
	let decode_res: String = decode_ethabi(&encode_res).unwrap();

    let result = format!("{} {}", encode_res, decode_res);
	println!("{}", result);
    Ok(cx.string(result))
}


#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("test_encode", test_encode)?;
    Ok(())
}