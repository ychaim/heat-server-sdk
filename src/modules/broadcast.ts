import { BroadcastParam, BroadcastResult, tryParse, CallContext, ModuleResponse } from 'heat-server-common'

export async function broadcast(context: CallContext, param: BroadcastParam): Promise<ModuleResponse<BroadcastResult>> {
  try {
    const { req, protocol, host, logger } = context
    const { transactionHex } = param
    const url = `${protocol}://${host}/api/BROADCAST`;
    const json = await req.post(url, { form: { transactionBytes: transactionHex } }, [200]);
    const data = tryParse(json, logger);
    
    return {
      value: {
        transactionId: '0x12345',
        errorMessage: undefined,
      },
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
}