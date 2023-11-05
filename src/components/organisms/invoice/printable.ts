import { dateConverter, period } from "@src/helper/date"
import formattedDate from "@src/utils/formatDate"
import { instagramIcon, invoiceIcon, linkIcon, twitterIcon } from "./base64"

export const htmlContent = (currentTransaction) => {
  const { project, guestSet, owner, dateStart, dateEnd, invoiceNumber, createdDate } = currentTransaction

  return `
<html>
  <head>
    <meta name="viewport" content=" initial-scale=0" />
    <style>
      .container {
        width: 25.5cm;
        margin: 0 auto;
      }

      .table {
        width: 100%;
        border: 1px solid grey;
      }
      
      .table-item {
        border-bottom: 1px solid grey;
      }

      .table tr {
        display:flex;
        justify-content:space-between;
      }

      .table td {
        padding: 20px;
      }

      .table a {
        display:inline-block;
        padding-top: 15px;  
      }
      
      @media print {
        html,
        body,
        .container {
          width: 25cm;
          height: 35cm;
        }
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div style="display: flex; justify-content: space-between; margin: auto">
        <div style="width: 30%">
          <img src="${invoiceIcon}" alt="icon" />
          <h2 style="padding-top: 14.7rem; color: #ff4332; text-transform: uppercase; padding-bottom: 32rem">payment info</h2>
          <div>
            <p>
              Payment Terms <br />
              Payment within 14 days from <br />
              invoice receipt without deductions
            </p>
          </div>
        </div>

        <div style="width: 60%">
          <div>
            <h1>Invoice | ${project.name}</h1>
            <p style="color: grey">No. ${invoiceNumber} | Date ${formattedDate(createdDate)}</p>
          </div>

          <div style="display: flex; justify-content: space-between; margin: 50px 0">
            <div>
              <h3>from</h3>
              <p>${owner.firstname || "no name" + owner.lastname}</p>
              <p>${project.accommodation.address}</p>
            </div>
            <div>
              <h3>To</h3>
              <p>${guestSet[0].name}</p>
            </div>
          </div>

          <table class="table">
            <tr class="table-item">
              <td>
                <h3>Details</h3>
              </td>
              <td></td>
            </tr>

            <tr class="table-item">
              <td>
                <p>Travel Duration</p>
              </td>

              <td>
                <p>${dateConverter(dateStart)} to ${dateConverter(dateEnd)}</p>
              </td>
            </tr>

            <tr class="table-item">
              <td>
                <p>Travel Date</p>
              </td>
              <td>
                <p>${period(dateStart, dateEnd)} nights</p>
              </td>
            </tr>

            <tr class="table-item">
              <td>
                <p>Place</p>
              </td>
              <td>
                <a style="color:#333" href="${
                  "https://www.google.com/maps/search/?api=1&query=" + project.accommodation.lat + "," + project.accommodation.lng
                }">
                <img src="${linkIcon}" alt="link icon" width="14px"/>
                ${project.accommodation.address}
                </a>
              </td>
            </tr>

            <tr>
              <td>
                <p>facilities</p>
              </td>
              <td>
                ${project.facilities.map((facility) => `<p>${facility.enName || "no facilities"}</p>`)}
              </td>
            </tr>
          </table>

          <div style="margin-top: 76px; background: #f3f3f3; padding: 10px 20px">
            <div style="display: flex; justify-content: space-between">
              <p>number of passengers</p>
              <p>${guestSet.length}</p>
            </div>

            <div style="display: flex; justify-content: space-between">
              <p>Price per person</p>
              <p>${project.price}</p>
            </div>

            <div style="display: flex; justify-content: space-between">
              <p>Sub total</p>
              <p>$${project.price * guestSet.length}</p>
            </div>

            <div style="display: flex; justify-content: space-between">
              <p>BTW 9%</p>
              <p>$${project.tax || 0}</p>
            </div>
          </div>

          <div
            style="
              color: white;
              display: flex;
              margin-top: 20px;
              padding: 10px 20px;
              align-items: center;
              background-color: #000;
              justify-content: space-between;
            ">
            <p>TOTAL</p>
            <p style="padding: 5px 20px; border-radius: 21px; background-color: gray">$${project.price * guestSet.length + project.tax}</p>
          </div>
        </div>
      </div>

      <footer style="padding: 80px; margin-top: 80px; display: flex; justify-content: space-between; align-items: center; background-color: #f3f3f3">
        <div>
          <h2>Thank you</h2>
          <p style="color: grey">MofidTrip | +2177576949 | info@mofidtrip.com</p>
        </div>
        <div>
          <img src="${instagramIcon}" width="32px" alt="instagram logo" style="padding-right:10px"/>
          <img src="${twitterIcon}" width="32px" alt="twitter logo" />
        </div>
      </footer>
    </div>
  </body>
</html>`
}
