import resend from "../config/resend.js";

export const sendOrderEmails = async (
  order
) => {
  try {


    const result = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "kalundia7@gmail.com",
  subject: "Test Email",
  html: "<h1>Test</h1>",
});

console.log(result);



    const deliveryDate = new Date();

    deliveryDate.setDate(
      deliveryDate.getDate() + 14
    );

    const formattedDeliveryDate =
      deliveryDate.toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );

    const itemRows = order.items
      .map(
        (item) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.size}</td>
        <td>${item.qty}</td>
        <td>₹${item.price}</td>
      </tr>
    `
      )
      .join("");

    // ======================
    // ADMIN EMAIL
    // ======================

    await resend.emails.send({
      from:
        "phoolsipyarii.com",

      to: "phoolsipyarii@gmail.com",

      subject: `🛍 New Order Received #${order._id}`,

      html: `
      <h2>New Order Received</h2>

      <p><strong>Customer:</strong> ${order.customerName}</p>
      <p><strong>Email:</strong> ${order.email}</p>
      <p><strong>Phone:</strong> ${order.contact}</p>

      <p><strong>Address:</strong></p>
      <p>
      ${order.address.address},
      ${order.address.city},
      ${order.address.state}
      - ${order.address.pincode}
      </p>

      <h3>Products</h3>

      <table border="1" cellpadding="8">
        <tr>
          <th>Product</th>
          <th>Size</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>

        ${itemRows}
      </table>

      <h3>Total Amount: ₹${order.amount}</h3>
      `,
    });

    // ======================
    // CUSTOMER EMAIL
    // ======================

    await resend.emails.send({
      from:
        "phoolsipyarii.com",

      to: order.email,

      subject:
        "Your Order has been Confirmed 🎉",

      html: `
      <div style="
      font-family: Arial;
      max-width:600px;
      margin:auto;
      ">

      <h2>
      Thank you for shopping with
      Phool Si Pyari 🌸
      </h2>

      <p>
      Hi ${order.customerName},
      </p>

      <p>
      We have successfully received
      your order.
      </p>

      <h3>Order Details</h3>

      <table border="1" cellpadding="8">
        <tr>
          <th>Product</th>
          <th>Size</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>

        ${itemRows}
      </table>

      <br>

      <p>
      <strong>Total Amount:</strong>
      ₹${order.amount}
      </p>

      <p>
      <strong>Order ID:</strong>
      ${order._id}
      </p>

      <p>
      <strong>Estimated Delivery:</strong>
      ${formattedDeliveryDate}
      </p>

      <p>
      Your package is being prepared
      and will reach you within
      14 days.
      </p>

      <p>
      Thank you for choosing
      Phool Si Pyari 🌸
      </p>

      </div>
      `,
    });

    console.log(
      "Order emails sent successfully"
    );
  } catch (error) {
    console.log(
      "Email Error:",
      error.message
    );
  }
};