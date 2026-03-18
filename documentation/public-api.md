# Public API

**Base URL:** `/api/v1`

These endpoints are publicly accessible or require only basic authentication. They provide health monitoring, public catalog browsing, and asset management capabilities.

---

## Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/health-status` | No | Service health check |
| GET | `/api/v1/get-all-pkg` | No | List all available travel packages |
| POST | `/api/v1/assets/upload-file` | Yes (`authMiddleware`) | Upload a file to Cloudinary |

---

## GET `/api/v1/health-status`

Service health check endpoint used to verify the API is running and responsive. Useful for uptime monitors, load balancer probes, and deployment verification.

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `restype` | string | Yes | Response type: `"success"` returns `200 OK`, `"fail"` returns `400 Bad Request` |

### Request Example

```
GET /api/v1/health-status?restype=success
```

### Success Response (`restype=success`)

**Status:** `200 OK`

```json
{
  "statusCode": 200,
  "data": null,
  "message": "Api is working perfectly"
}
```

### Error Response (`restype=fail`)

**Status:** `400 Bad Request`

```json
{
  "statusCode": 400,
  "message": "Api is sending the error as per request",
  "issues": []
}
```

### Error Responses

| Status | Condition |
|--------|-----------|
| 400 | `restype=fail` passed intentionally |
| 500 | Invalid or missing `restype` value triggers a runtime error |

---

## GET `/api/v1/get-all-pkg`

Returns all travel packages that are currently approved, active for booking, and not soft-deleted. This is the primary endpoint for the public-facing package catalog.

### Query Parameters

None

### Request Example

```
GET /api/v1/get-all-pkg
```

### Filters Applied

The following server-side filters are applied automatically — only packages matching **all** conditions are returned:

| Filter | Value | Purpose |
|--------|-------|---------|
| `isBookingActive` | `true` | Package is open for bookings |
| `isDeleted` | `false` | Package has not been removed |
| `packageApprovedStatus` | `APPROVED` | Package has been vetted by an admin |

### Success Response

**Status:** `200 OK`

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "cltx8f9k20001abcd",
      "title": "Goa Beach Getaway",
      "description": "5 days of sun, sand, and seafood on Goa's finest beaches.",
      "pricePerPerson": 5000,
      "totalSeats": 20,
      "availableSeats": 15,
      "discountAmount": 0,
      "discountPercentage": 10,
      "withTax": true,
      "taxPercentage": 18,
      "destination": "Goa",
      "durationDays": 5,
      "startDate": "2026-04-01T00:00:00.000Z",
      "endDate": "2026-04-05T00:00:00.000Z",
      "bookingActiveFrom": "2026-03-01T00:00:00.000Z",
      "bookingEndAt": "2026-03-28T00:00:00.000Z",
      "isBookingActive": true,
      "packageApprovedStatus": "APPROVED",
      "packagePolicies": "Full refund if cancelled 7 days before departure.",
      "cancellationPolicies": "No refund within 48 hours of departure.",
      "PackageBannerImage": {
        "imageUrl": "https://res.cloudinary.com/demo/image/upload/v1/banner.jpg",
        "fileId": "banner_file_123"
      },
      "packagesImages": [
        {
          "imageUrl": "https://res.cloudinary.com/demo/image/upload/v1/gallery1.jpg",
          "fileId": "gallery_file_456"
        }
      ],
      "itinerary": [
        {
          "id": "cltx8itin0001",
          "dayNumber": 1,
          "title": "Arrival & Beach Tour",
          "description": "Check in and explore nearby beaches."
        }
      ],
      "agent": {
        "id": "cltx8agent0001",
        "companyName": "Coastal Travels Pvt. Ltd.",
        "user": {
          "fullName": "Rahul Sharma",
          "profileImage": {
            "imageUrl": "https://res.cloudinary.com/demo/image/upload/v1/agent.jpg"
          }
        }
      },
      "createdAt": "2026-03-01T00:00:00.000Z",
      "updatedAt": "2026-03-10T00:00:00.000Z"
    }
  ],
  "message": "Successfully get all the available packages"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique package identifier (CUID) |
| `title` | string | Package display name |
| `description` | string | Detailed package description |
| `pricePerPerson` | float | Base price per traveler (INR) |
| `totalSeats` | int | Total capacity for the package |
| `availableSeats` | int | Remaining seats available for booking |
| `discountAmount` | int | Flat discount amount (INR), default `0` |
| `discountPercentage` | int | Percentage discount, default `0` |
| `withTax` | boolean | Whether tax is applicable |
| `taxPercentage` | int | GST percentage (e.g., `18`), default `0` |
| `destination` | string | Travel destination |
| `durationDays` | int | Trip duration in days |
| `startDate` | ISO 8601 | Trip start date |
| `endDate` | ISO 8601 | Trip end date |
| `bookingActiveFrom` | ISO 8601 | Date from which bookings open |
| `bookingEndAt` | ISO 8601 | Booking deadline |
| `isBookingActive` | boolean | Whether the package is accepting bookings |
| `packageApprovedStatus` | enum | Approval status: `PENDING`, `APPROVED`, `REJECTED` |
| `packagePolicies` | string | Terms and conditions for the package |
| `cancellationPolicies` | string | Refund and cancellation terms |
| `PackageBannerImage` | object | Primary banner image (`imageUrl`, `fileId`) |
| `packagesImages` | array | Gallery images, each with `imageUrl` and `fileId` |
| `itinerary` | array | Day-wise itinerary items |
| `agent` | object | Agent profile with `id`, `companyName`, and nested `user` info |
| `createdAt` | ISO 8601 | Package creation timestamp |
| `updatedAt` | ISO 8601 | Last modification timestamp |

### Notes

- Returns an empty array `[]` if no packages match the filter criteria.
- All date/time values are in UTC (ISO 8601 format).
- The `itinerary` array may include nested objects for hotel stays, meals, transport, and visit places depending on the package configuration.

---

## POST `/api/v1/assets/upload-file`

Upload a file to Cloudinary. The returned `url` and `fileId` are used when setting images in other API calls (e.g., profile image, package banner, gallery images).

### Authentication

Requires `authMiddleware` — a valid JWT must be present in the `accesstoken` cookie.

See [Authentication](README.md#authentication) for details.

### Request

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | The file to upload (image, document, etc.) |

### Request Example (cURL)

```bash
curl -X POST https://api.batoibhai.com/api/v1/assets/upload-file \
  -H "Cookie: accesstoken=Bearer eyJhbGci..." \
  -F "file=@/path/to/image.jpg"
```

### Success Response

**Status:** `200 OK`

```json
{
  "statusCode": 200,
  "data": {
    "url": "https://res.cloudinary.com/your-cloud/image/upload/v1/abc123.jpg",
    "fileId": "abc123"
  },
  "message": "file uploded successfuly to the cloude"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `data.url` | string | Public Cloudinary URL for the uploaded file |
| `data.fileId` | string | Cloudinary public ID — required for deletion or referencing the file in other API calls |

### Error Responses

| Status | Condition | Message |
|--------|-----------|---------|
| 400 | No file attached in the request | `"No file uploaded"` |
| 400 | Cloudinary upload failed | `"Image not uploaded to the cloudianry"` |
| 401 | Missing or invalid JWT token | Unauthorized |

### Processing Flow

1. File is received via `multer` and temporarily stored on disk at `./public/temp`.
2. File is uploaded to Cloudinary using configured credentials.
3. Temporary file is deleted from disk after successful upload.
4. Cloudinary `url` and `fileId` are returned in the response.

### Notes

- The `fileId` returned should be saved and used when assigning images to profiles, packages, or other entities via their respective update endpoints.
- If the Cloudinary upload fails, the temporary file is still cleaned up to prevent disk accumulation.
