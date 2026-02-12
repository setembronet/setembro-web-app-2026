#!/bin/bash

# Load environment variables
source .env.local

# Configuration
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.sql"

# Ensure backup directory exists
mkdir -p $BACKUP_DIR

echo "📦 Starting Supabase Backup..."

# Check if we are using local Supabase or Cloud
if [ -z "$SUPABASE_DB_URL" ]; then
    echo "⚠️ SUPABASE_DB_URL not set. Assuming Supabase CLI local."
    npx supabase db dump -f $BACKUP_FILE
else
    echo "🌐 Dumping from Remote DB..."
    pg_dump "$SUPABASE_DB_URL" -f $BACKUP_FILE
fi

if [ $? -eq 0 ]; then
    echo "✅ Backup completed successfully: $BACKUP_FILE"
    
    # Retention Policy: Keep last 7 days
    find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -exec rm {} \;
    echo "🧹 Cleaned up old backups."
else
    echo "❌ Backup failed!"
    exit 1
fi
