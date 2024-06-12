use neon::prelude::*;
use crate::utils::ethabiwrapper::{encode_ethabi, decode_ethabi};
mod utils;

fn rs_encode(mut cx: FunctionContext) -> JsResult<(JsString)> {
    let input = cx
    .argument::<JsString>(0)? 
    .value(&mut cx);

    let encode_res: String = encode_ethabi(&input).unwrap();
    Ok(cx.string(encode_res))
}

fn rs_decode(mut cx: FunctionContext) -> JsResult<(JsString)> {
    let input = cx
    .argument::<JsString>(0)? 
    .value(&mut cx);

	let decode_res: String = decode_ethabi(&input).unwrap();
    Ok(cx.string(decode_res))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("rs_decode", rs_decode)?;
    cx.export_function("rs_encode", rs_encode)?;
    Ok(())
}