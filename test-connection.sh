#!/bin/bash

# Event Management CMS - Connection Test Script
# Run this after starting the server to verify everything is working

CMS_URL="http://localhost:3000"
API_URL="$CMS_URL/api"

echo "🚀 Event Management CMS - Connection Test"
echo "=========================================="
echo ""
echo "Testing connection to: $CMS_URL"
echo ""

# Test 1: Admin Panel Accessibility
echo "1️⃣  Testing Admin Panel..."
ADMIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$CMS_URL/admin")
if [ "$ADMIN_STATUS" = "200" ]; then
  echo "✅ Admin panel is accessible at $CMS_URL/admin"
else
  echo "❌ Admin panel not accessible (HTTP $ADMIN_STATUS)"
fi
echo ""

# Test 2: Events API
echo "2️⃣  Testing Events API..."
EVENTS_RESPONSE=$(curl -s "$API_URL/events")
if echo "$EVENTS_RESPONSE" | grep -q "docs"; then
  echo "✅ Events API is working"
  echo "   Response: $(echo $EVENTS_RESPONSE | head -c 100)..."
else
  echo "❌ Events API error"
  echo "   Response: $EVENTS_RESPONSE"
fi
echo ""

# Test 3: Speakers API
echo "3️⃣  Testing Speakers API..."
SPEAKERS_RESPONSE=$(curl -s "$API_URL/speakers")
if echo "$SPEAKERS_RESPONSE" | grep -q "docs"; then
  echo "✅ Speakers API is working"
else
  echo "❌ Speakers API error"
fi
echo ""

# Test 4: Venues API
echo "4️⃣  Testing Venues API..."
VENUES_RESPONSE=$(curl -s "$API_URL/venues")
if echo "$VENUES_RESPONSE" | grep -q "docs"; then
  echo "✅ Venues API is working"
else
  echo "❌ Venues API error"
fi
echo ""

# Test 5: Users (Auth) API
echo "5️⃣  Testing Users API..."
USERS_RESPONSE=$(curl -s -w "\n%{http_code}" "$API_URL/users")
HTTP_CODE=$(echo "$USERS_RESPONSE" | tail -n 1)
BODY=$(echo "$USERS_RESPONSE" | head -n -1)
if [ "$HTTP_CODE" = "403" ] || [ "$HTTP_CODE" = "401" ] || echo "$BODY" | grep -q "docs"; then
  echo "✅ Users API is accessible (protected route)"
else
  echo "❌ Users API error (HTTP $HTTP_CODE)"
fi
echo ""

# Test 6: CORS Check
echo "6️⃣  Testing CORS Headers..."
CORS_CHECK=$(curl -s -H "Origin: https://idc-eta.vercel.app" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS "$API_URL/events" \
  -w "\n%{http_code}")
CORS_CODE=$(echo "$CORS_CHECK" | tail -n 1)
if [ "$CORS_CODE" = "200" ]; then
  echo "✅ CORS is properly configured"
else
  echo "⚠️  CORS check returned HTTP $CORS_CODE (may still work for GET)"
fi
echo ""

# Test 7: Database Connection
echo "7️⃣  Testing Database Connection..."
DB_TEST=$(curl -s "$API_URL/events?limit=1")
if echo "$DB_TEST" | grep -q '"totalDocs"'; then
  TOTAL_DOCS=$(echo "$DB_TEST" | grep -o '"totalDocs":[0-9]*' | grep -o '[0-9]*')
  echo "✅ Database connected (found $TOTAL_DOCS events)"
else
  echo "❌ Database connection failed"
  echo "   Response: $DB_TEST"
fi
echo ""

echo "=========================================="
echo "✨ Test Summary"
echo ""
echo "If all tests passed ✅, your CMS is ready!"
echo ""
echo "Next Steps:"
echo "1. Create an admin user: pnpm run payload user:create"
echo "2. Log in to admin panel: $CMS_URL/admin"
echo "3. Add test data (venues, speakers, events)"
echo "4. Update your frontend to use: $API_URL"
echo ""
echo "Frontend Integration:"
echo "Copy the CMS_URL to your frontend:"
echo "  const CMS_URL = '$CMS_URL';"
echo ""
