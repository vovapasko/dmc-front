import { Attachment } from '@models/instances/attachment';

export interface Email {
  id?: number;
  dateCreated?: Date;
  dateUpdated?: Date;
  email: string;
  template: string;
  signature: string;
  codeword: string;
  gmailCredentials: string | null;
  password?: string | null;
}

export interface EmailEntity {
  id?: string;
  threadId?: string;
  snippet?: string;
  internalDate?: string;
  payload?: EmailPayload;
  base64?: string;
  html?: string;
  subject?: string;
  date?: string;
  from?: string;
  to?: string;
  attachments?: Attachment[];
}

export interface Part {
  body: PartBody;
  mimeType: string;
  filename: string;
}

export interface PartBody {
  data: string;
  size: number;
}

export enum mimeTypes {
  'text' = 'text/plain',
  'html' = 'text/html'
}

export enum payloadHeaders {
  'subject' = 'Subject',
  'from' = 'From',
  'to' = 'To',
  'date' = 'Date'
}

//{
//   "success": true,
//   "message": null,
//   "id": "175bb2732b80da4f",
//   "threadId": "175bb2732b80da4f",
//   "labelIds": [
//     "UNREAD",
//     "CATEGORY_PERSONAL",
//     "INBOX"
//   ],
//   "snippet": "crm тепер має доступ до Вашого облікового запису Google sandrez.spartanell2@gmail.com Якщо ви не надавали доступу, перевірте історію дій, щоб захистити свій обліковий запис. Перевірити дії Ви також",
//   "payload": {
//     "partId": "",
//     "mimeType": "multipart/alternative",
//     "filename": "",
//     "headers": [
//       {
//         "name": "Subject",
//         "value": "Сповіщення системи безпеки"
//       },
//       {
//         "name": "From",
//         "value": "Google <no-reply@accounts.google.com>"
//       },
//       {
//         "name": "To",
//         "value": "sandrez.spartanell2@gmail.com"
//       },
//
//     ],
//     "parts": [
//       {
//         "partId": "0",
//         "mimeType": "text/plain",
//         "filename": "",
//         "headers": [
//           {
//             "name": "Content-Type",
//             "value": "text/plain; charset=\"UTF-8\"; format=flowed; delsp=yes"
//           },
//           {
//             "name": "Content-Transfer-Encoding",
//             "value": "base64"
//           }
//         ],
//         "body": {
//           "size": 927,
//           "data": "W2ltYWdlOiBHb29nbGVdDQpjcm0g0YLQtdC_0LXRgCDQvNCw0ZQg0LTQvtGB0YLRg9C_INC00L4g0JLQsNGI0L7Qs9C-INC-0LHQu9GW0LrQvtCy0L7Qs9C-INC30LDQv9C40YHRgyBHb29nbGUNCg0KDQpzYW5kcmV6LnNwYXJ0YW5lbGwyQGdtYWlsLmNvbQ0KDQrQr9C60YnQviDQstC4INC90LUg0L3QsNC00LDQstCw0LvQuCDQtNC-0YHRgtGD0L_Rgywg0L_QtdGA0LXQstGW0YDRgtC1INGW0YHRgtC-0YDRltGOINC00ZbQuSwg0YnQvtCxINC30LDRhdC40YHRgtC40YLQuCDRgdCy0ZbQuQ0K0L7QsdC70ZbQutC-0LLQuNC5INC30LDQv9C40YEuDQrQn9C10YDQtdCy0ZbRgNC40YLQuCDQtNGW0ZcNCjxodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vQWNjb3VudENob29zZXI_RW1haWw9c2FuZHJlei5zcGFydGFuZWxsMkBnbWFpbC5jb20mY29udGludWU9aHR0cHM6Ly9teWFjY291bnQuZ29vZ2xlLmNvbS9hbGVydC9udC8xNjA1MTYyNzA4MDAwP3JmbiUzRDEyNyUyNnJmbmMlM0QxJTI2ZWlkJTNEMzkzMTc4MDY4NjQwOTMzNTM0JTI2ZXQlM0QwPg0K0JLQuCDRgtCw0LrQvtC2INC80L7QttC10YLQtSDQv9C10YDQtdC50YLQuCDQv9GA0L7RgdGC0L4g0L3QsCDRhtGOINGB0YLQvtGA0ZbQvdC60YM6DQpodHRwczovL215YWNjb3VudC5nb29nbGUuY29tL25vdGlmaWNhdGlvbnMNCtCm0LjQvCDQtdC70LXQutGC0YDQvtC90L3QuNC5INC70LjRgdGC0L7QvCDQvNC4INC_0L7QstGW0LTQvtC80LvRj9GU0LzQviDQktCw0YEg0L_RgNC-INCy0LDQttC70LjQstGWINC30LzRltC90Lgg0LIg0L7QsdC70ZbQutC-0LLQvtC80YMNCtC30LDQv9C40YHRliDRgtCwINGB0LvRg9C20LHQsNGFIEdvb2dsZS4NCsKpIDIwMjAgR29vZ2xlIExMQywgMTYwMCBBbXBoaXRoZWF0cmUgUGFya3dheSwgTW91bnRhaW4gVmlldywgQ0EgOTQwNDMsIFVTQQ0K"
//         }
//       },
//       {
//         "partId": "1",
//         "mimeType": "text/html",
//         "filename": "",
//         "headers": [
//           {
//             "name": "Content-Type",
//             "value": "text/html; charset=\"UTF-8\""
//           },
//           {
//             "name": "Content-Transfer-Encoding",
//             "value": "quoted-printable"
//           }
//         ],
//         "body": {
//           "size": 4997,
//           "data": "PCFET0NUWVBFIGh0bWw-PGh0bWwgbGFuZz0iZW4iPjxoZWFkPjxtZXRhIG5hbWU9ImZvcm1hdC1kZXRlY3Rpb24iIGNvbnRlbnQ9ImVtYWlsPW5vIi8-PG1ldGEgbmFtZT0iZm9ybWF0LWRldGVjdGlvbiIgY29udGVudD0iZGF0ZT1ubyIvPjxzdHlsZSBub25jZT0iMFUwZ3ZtZVlBSEEvbkYxY1BOQXF6ZyI-LmF3bCBhIHtjb2xvcjogI0ZGRkZGRjsgdGV4dC1kZWNvcmF0aW9uOiBub25lO30gLmFibWwgYSB7Y29sb3I6ICMwMDAwMDA7IGZvbnQtZmFtaWx5OiBSb2JvdG8tTWVkaXVtLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmOyBmb250LXdlaWdodDogYm9sZDsgdGV4dC1kZWNvcmF0aW9uOiBub25lO30gLmFkZ2wgYSB7Y29sb3I6IHJnYmEoMCwgMCwgMCwgMC44Nyk7IHRleHQtZGVjb3JhdGlvbjogbm9uZTt9IC5hZmFsIGEge2NvbG9yOiAjYjBiMGIwOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7fSBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2MDBweCkgey52MnNwIHtwYWRkaW5nOiA2cHggMzBweCAwcHg7fSAudjJyc3Age3BhZGRpbmc6IDBweCAxMHB4O319IEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDYwMHB4KSB7Lm1kdjJydyB7cGFkZGluZzogNDBweCA0MHB4O319IDwvc3R5bGU-PGxpbmsgaHJlZj0iLy9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M_ZmFtaWx5PUdvb2dsZStTYW5zIiByZWw9InN0eWxlc2hlZXQiIHR5cGU9InRleHQvY3NzIi8-PC9oZWFkPjxib2R5IHN0eWxlPSJtYXJnaW46IDA7IHBhZGRpbmc6IDA7IiBiZ2NvbG9yPSIjRkZGRkZGIj48dGFibGUgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgc3R5bGU9Im1pbi13aWR0aDogMzQ4cHg7IiBib3JkZXI9IjAiIGNlbGxzcGFjaW5nPSIwIiBjZWxscGFkZGluZz0iMCIgbGFuZz0iZW4iPjx0ciBoZWlnaHQ9IjMyIiBzdHlsZT0iaGVpZ2h0OiAzMnB4OyI-PHRkPjwvdGQ-PC90cj48dHIgYWxpZ249ImNlbnRlciI-PHRkPjxkaXYgaXRlbXNjb3BlIGl0ZW10eXBlPSIvL3NjaGVtYS5vcmcvRW1haWxNZXNzYWdlIj48ZGl2IGl0ZW1wcm9wPSJhY3Rpb24iIGl0ZW1zY29wZSBpdGVtdHlwZT0iLy9zY2hlbWEub3JnL1ZpZXdBY3Rpb24iPjxsaW5rIGl0ZW1wcm9wPSJ1cmwiIGhyZWY9Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9BY2NvdW50Q2hvb3Nlcj9FbWFpbD1zYW5kcmV6LnNwYXJ0YW5lbGwyQGdtYWlsLmNvbSZhbXA7Y29udGludWU9aHR0cHM6Ly9teWFjY291bnQuZ29vZ2xlLmNvbS9hbGVydC9udC8xNjA1MTYyNzA4MDAwP3JmbiUzRDEyNyUyNnJmbmMlM0QxJTI2ZWlkJTNEMzkzMTc4MDY4NjQwOTMzNTM0JTI2ZXQlM0QwIi8-PG1ldGEgaXRlbXByb3A9Im5hbWUiIGNvbnRlbnQ9ItCf0LXRgNC10LPQu9GP0L3Rg9GC0Lgg0LDQutGC0LjQstC90ZbRgdGC0YwiLz48L2Rpdj48L2Rpdj48dGFibGUgYm9yZGVyPSIwIiBjZWxsc3BhY2luZz0iMCIgY2VsbHBhZGRpbmc9IjAiIHN0eWxlPSJwYWRkaW5nLWJvdHRvbTogMjBweDsgbWF4LXdpZHRoOiA1MTZweDsgbWluLXdpZHRoOiAyMjBweDsiPjx0cj48dGQgd2lkdGg9IjgiIHN0eWxlPSJ3aWR0aDogOHB4OyI-PC90ZD48dGQ-PGRpdiBzdHlsZT0iYm9yZGVyLXN0eWxlOiBzb2xpZDsgYm9yZGVyLXdpZHRoOiB0aGluOyBib3JkZXItY29sb3I6I2RhZGNlMDsgYm9yZGVyLXJhZGl1czogOHB4OyBwYWRkaW5nOiA0MHB4IDIwcHg7IiBhbGlnbj0iY2VudGVyIiBjbGFzcz0ibWR2MnJ3Ij48aW1nIHNyYz0iaHR0cHM6Ly93d3cuZ3N0YXRpYy5jb20vaW1hZ2VzL2JyYW5kaW5nL2dvb2dsZWxvZ28vMngvZ29vZ2xlbG9nb19jb2xvcl83NHgyNGRwLnBuZyIgd2lkdGg9Ijc0IiBoZWlnaHQ9IjI0IiBhcmlhLWhpZGRlbj0idHJ1ZSIgc3R5bGU9Im1hcmdpbi1ib3R0b206IDE2cHg7IiBhbHQ9Ikdvb2dsZSI-PGRpdiBzdHlsZT0iZm9udC1mYW1pbHk6ICYjMzk7R29vZ2xlIFNhbnMmIzM5OyxSb2JvdG8sUm9ib3RvRHJhZnQsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7Ym9yZGVyLWJvdHRvbTogdGhpbiBzb2xpZCAjZGFkY2UwOyBjb2xvcjogcmdiYSgwLDAsMCwwLjg3KTsgbGluZS1oZWlnaHQ6IDMycHg7IHBhZGRpbmctYm90dG9tOiAyNHB4O3RleHQtYWxpZ246IGNlbnRlcjsgd29yZC1icmVhazogYnJlYWstd29yZDsiPjxkaXYgc3R5bGU9ImZvbnQtc2l6ZTogMjRweDsiPjxhPmNybTwvYT4g0YLQtdC_0LXRgCDQvNCw0ZQg0LTQvtGB0YLRg9C_INC00L4g0JLQsNGI0L7Qs9C-INC-0LHQu9GW0LrQvtCy0L7Qs9C-INC30LDQv9C40YHRgyZuYnNwO0dvb2dsZSA8L2Rpdj48dGFibGUgYWxpZ249ImNlbnRlciIgc3R5bGU9Im1hcmdpbi10b3A6OHB4OyI-PHRyIHN0eWxlPSJsaW5lLWhlaWdodDogbm9ybWFsOyI-PHRkIGFsaWduPSJyaWdodCIgc3R5bGU9InBhZGRpbmctcmlnaHQ6OHB4OyI-PGltZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHN0eWxlPSJ3aWR0aDogMjBweDsgaGVpZ2h0OiAyMHB4OyB2ZXJ0aWNhbC1hbGlnbjogc3ViOyBib3JkZXItcmFkaXVzOiA1MCU7OyIgc3JjPSJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLXZ6U05wbmVoblhRL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y25QRnlNaHNob2lnWENBajV0V3BwVkdjSnJmTWcvczk2L3Bob3RvLmpwZyIgYWx0PSIiPjwvdGQ-PHRkPjxhIHN0eWxlPSJmb250LWZhbWlseTogJiMzOTtHb29nbGUgU2FucyYjMzk7LFJvYm90byxSb2JvdG9EcmFmdCxIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtjb2xvcjogcmdiYSgwLDAsMCwwLjg3KTsgZm9udC1zaXplOiAxNHB4OyBsaW5lLWhlaWdodDogMjBweDsiPnNhbmRyZXouc3BhcnRhbmVsbDJAZ21haWwuY29tPC9hPjwvdGQ-PC90cj48L3RhYmxlPiA8L2Rpdj48ZGl2IHN0eWxlPSJmb250LWZhbWlseTogUm9ib3RvLVJlZ3VsYXIsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogMTRweDsgY29sb3I6IHJnYmEoMCwwLDAsMC44Nyk7IGxpbmUtaGVpZ2h0OiAyMHB4O3BhZGRpbmctdG9wOiAyMHB4OyB0ZXh0LWFsaWduOiBsZWZ0OyI-PGJyPtCv0LrRidC-INCy0Lgg0L3QtSDQvdCw0LTQsNCy0LDQu9C4INC00L7RgdGC0YPQv9GDLCDQv9C10YDQtdCy0ZbRgNGC0LUg0ZbRgdGC0L7RgNGW0Y4g0LTRltC5LCDRidC-0LEg0LfQsNGF0LjRgdGC0LjRgtC4INGB0LLRltC5INC-0LHQu9GW0LrQvtCy0LjQuSDQt9Cw0L_QuNGBLjxkaXYgc3R5bGU9InBhZGRpbmctdG9wOiAzMnB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Ij48YSBocmVmPSJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vQWNjb3VudENob29zZXI_RW1haWw9c2FuZHJlei5zcGFydGFuZWxsMkBnbWFpbC5jb20mYW1wO2NvbnRpbnVlPWh0dHBzOi8vbXlhY2NvdW50Lmdvb2dsZS5jb20vYWxlcnQvbnQvMTYwNTE2MjcwODAwMD9yZm4lM0QxMjclMjZyZm5jJTNEMSUyNmVpZCUzRDM5MzE3ODA2ODY0MDkzMzUzNCUyNmV0JTNEMCIgdGFyZ2V0PSJfYmxhbmsiIGxpbmstaWQ9Im1haW4tYnV0dG9uLWxpbmsiIHN0eWxlPSJmb250LWZhbWlseTogJiMzOTtHb29nbGUgU2FucyYjMzk7LFJvYm90byxSb2JvdG9EcmFmdCxIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjsgbGluZS1oZWlnaHQ6IDE2cHg7IGNvbG9yOiAjZmZmZmZmOyBmb250LXdlaWdodDogNDAwOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7Zm9udC1zaXplOiAxNHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6IDEwcHggMjRweDtiYWNrZ3JvdW5kLWNvbG9yOiAjNDE4NEYzOyBib3JkZXItcmFkaXVzOiA1cHg7IG1pbi13aWR0aDogOTBweDsiPtCf0LXRgNC10LLRltGA0LjRgtC4INC00ZbRlzwvYT48L2Rpdj48L2Rpdj48ZGl2IHN0eWxlPSJwYWRkaW5nLXRvcDogMjBweDsgZm9udC1zaXplOiAxMnB4OyBsaW5lLWhlaWdodDogMTZweDsgY29sb3I6ICM1ZjYzNjg7IGxldHRlci1zcGFjaW5nOiAwLjNweDsgdGV4dC1hbGlnbjogY2VudGVyIj7QktC4INGC0LDQutC-0LYg0LzQvtC20LXRgtC1INC_0LXRgNC10LnRgtC4INC_0YDQvtGB0YLQviDQvdCwINGG0Y4g0YHRgtC-0YDRltC90LrRgzo8YnI-PGEgc3R5bGU9ImNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuODcpO3RleHQtZGVjb3JhdGlvbjogaW5oZXJpdDsiPmh0dHBzOi8vbXlhY2NvdW50Lmdvb2dsZS5jb20vbm90aWZpY2F0aW9uczwvYT48L2Rpdj48L2Rpdj48ZGl2IHN0eWxlPSJ0ZXh0LWFsaWduOiBsZWZ0OyI-PGRpdiBzdHlsZT0iZm9udC1mYW1pbHk6IFJvYm90by1SZWd1bGFyLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO2NvbG9yOiByZ2JhKDAsMCwwLDAuNTQpOyBmb250LXNpemU6IDExcHg7IGxpbmUtaGVpZ2h0OiAxOHB4OyBwYWRkaW5nLXRvcDogMTJweDsgdGV4dC1hbGlnbjogY2VudGVyOyI-PGRpdj7QptC40Lwg0LXQu9C10LrRgtGA0L7QvdC90LjQuSDQu9C40YHRgtC-0Lwg0LzQuCDQv9C-0LLRltC00L7QvNC70Y_RlNC80L4g0JLQsNGBINC_0YDQviDQstCw0LbQu9C40LLRliDQt9C80ZbQvdC4INCyINC-0LHQu9GW0LrQvtCy0L7QvNGDINC30LDQv9C40YHRliDRgtCwINGB0LvRg9C20LHQsNGFIEdvb2dsZS48L2Rpdj48ZGl2IHN0eWxlPSJkaXJlY3Rpb246IGx0cjsiPiZjb3B5OyAyMDIwIEdvb2dsZSBMTEMsIDxhIGNsYXNzPSJhZmFsIiBzdHlsZT0iZm9udC1mYW1pbHk6IFJvYm90by1SZWd1bGFyLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO2NvbG9yOiByZ2JhKDAsMCwwLDAuNTQpOyBmb250LXNpemU6IDExcHg7IGxpbmUtaGVpZ2h0OiAxOHB4OyBwYWRkaW5nLXRvcDogMTJweDsgdGV4dC1hbGlnbjogY2VudGVyOyI-MTYwMCBBbXBoaXRoZWF0cmUgUGFya3dheSwgTW91bnRhaW4gVmlldywgQ0EgOTQwNDMsIFVTQTwvYT48L2Rpdj48L2Rpdj48L2Rpdj48L3RkPjx0ZCB3aWR0aD0iOCIgc3R5bGU9IndpZHRoOiA4cHg7Ij48L3RkPjwvdHI-PC90YWJsZT48L3RkPjwvdHI-PHRyIGhlaWdodD0iMzIiIHN0eWxlPSJoZWlnaHQ6IDMycHg7Ij48dGQ-PC90ZD48L3RyPjwvdGFibGU-PC9ib2R5PjwvaHRtbD4="
//         }
//       }
//     ]
//   },
// }

export interface EmailPayload {
  headers: Header[];
  parts: Part[];
  mimeType: string;
  body: PayloadBody;
}

export interface PayloadBody {
  data: string;
}

export interface Header {
  name?: string;
  value?: string;
}
