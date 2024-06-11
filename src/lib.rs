use neon::prelude::*;
// use neon::{FunctionContext, JsResult, JsString};
use crate::utils::ethabiwrapper::{encode_ethabi, decode_ethabi};
// use anyhow::{Ok};

mod utils;

// fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
//     Ok(cx.string("hello node"))
// }


fn test_encode(mut cx: FunctionContext) -> JsResult<(JsString)> {
	let input:String = String::from("weavevm");
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