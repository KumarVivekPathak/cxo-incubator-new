import { supabase } from "./supabase";

export const sendEmail = async (to: string, subject: string, html: string) => {
  const { data, error } = await supabase.functions.invoke('resend-email', {
    body: { to, subject, html },
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};


// import { Resend } from 'resend';
// import { resendApiKey } from './supabase';

// const resend = new Resend(resendApiKey);

// export const sendEmail = async () => {
//   const { data, error } = await resend.emails.send({
//     from: 'Acme <support@cxoincubator.com>',
//     to: ['vkpathak2025@gmail.com'],
//     subject: 'Hello World mail',
//     html: '<strong>It works!</strong>',
//   });

//   if (error) {
//     return console.error({ error });
//   }

//   console.log({ data });
// };