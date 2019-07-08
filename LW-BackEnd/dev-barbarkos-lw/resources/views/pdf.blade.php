<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invoice - #123</title>

    <style type="text/css">
        @page {
            margin: 0px;
        }
        body {
            margin: 0px;
        }
        * {
            font-family: Verdana, Arial, sans-serif;
        }
        a {
            color: #fff;
            text-decoration: none;
        }
        table {
            font-size: x-small;
        }
        tfoot tr td {
            font-weight: bold;
            font-size: x-small;
        }
        .invoice table {
            margin: 15px;
        }
        .invoice h3 {
            margin-left: 15px;
        }
        .information {
            background-color: #27ab27;
            color: #FFF;
        }
        .information .logo {
            margin: 5px;
        }
        .information table {
            padding: 10px;
        }
    </style>

</head>
<body>

<div class="information">
    <table width="100%">
        <tr>
            <td align="left" style="width: 40%;">
                <h3>Premium Product Invoice</h3>
                <pre>
Owner Name: {{$user['name']}}

<br /><br />
Date: {{$premium['created_at']}}
Status: Paid
</pre>


            </td>

            <td align="right" style="width: 40%;">

                <pre>
                    https://barbarkost.com

                    Wisma Atrium, BCA
                    Jakarta Barat
                    Indonesia
                </pre>
            </td>
        </tr>

    </table>
</div>


<br/>

<div class="invoice">
    <h3>{{$premium['premium_name']}}</h3>
    <table width="100%">
        <thead>
        <tr>
            <th>Duration</th>
            <th>Price</th>
            <th>Promo</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>{{$premium['duration']}} days</td>
            <td>Rp. {{$premium['premium_price']}}</td>
            <td align="left">{{$promo * 100}}%</td>
        </tr>


        <tfoot>
        <tr>
            <td colspan="1"></td>
            <td align="left">Total</td>
            <td align="left" class="gray">Rp. {{$premium['premium_price'] * (1-$promo)}}</td>
        </tr>
        </tfoot>
    </table>
</div>

<div class="information" style="position: absolute; bottom: 0; width: 100%">
    <table width="100%">
        <tr>
            <td align="left" style="width: 50%;">
                &copy; {{ date('Y') }} {{ config('app.url') }} - All rights reserved.
            </td>
            <td align="right" style="width: 50%;">
                BarBar Kost
            </td>
        </tr>

    </table>
</div>
</body>
</html>