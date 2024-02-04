"""create db

Revision ID: a0527a59565e
Revises: 
Create Date: 2024-01-31 12:11:23.792845

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a0527a59565e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('route',
    sa.Column('route_id', sa.Integer(), nullable=False),
    sa.Column('route_distance', sa.Float(), nullable=True),
    sa.Column('route_name', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('route_id')
    )
    op.create_table('sacco',
    sa.Column('sacco_id', sa.Integer(), nullable=False),
    sa.Column('sacco_name', sa.String(length=100), nullable=True),
    sa.Column('sacco_description', sa.String(length=100), nullable=True),
    sa.Column('sacco_location', sa.String(length=100), nullable=True),
    sa.Column('sacco_phone', sa.String(length=100), nullable=True),
    sa.Column('sacco_email', sa.String(length=100), nullable=True),
    sa.Column('sacco_password', sa.String(length=100), nullable=True),
    sa.Column('sacco_rating', sa.Float(), nullable=True),
    sa.Column('sacco_verification_code', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('sacco_id'),
    sa.UniqueConstraint('sacco_name')
    )
    op.create_table('stage',
    sa.Column('stage_id', sa.Integer(), nullable=False),
    sa.Column('latitude', sa.Float(), nullable=True),
    sa.Column('longitude', sa.Float(), nullable=True),
    sa.Column('stage_name', sa.String(length=100), nullable=True),
    sa.Column('stage_description', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('stage_id')
    )
    op.create_table('stages_routes',
    sa.Column('route_id', sa.Integer(), nullable=True),
    sa.Column('stage_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['route_id'], ['route.route_id'], ),
    sa.ForeignKeyConstraint(['stage_id'], ['stage.stage_id'], )
    )
    op.create_table('user',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=100), nullable=False),
    sa.Column('other_name', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=100), nullable=True),
    sa.Column('password', sa.String(length=100), nullable=False),
    sa.Column('phone', sa.String(length=100), nullable=True),
    sa.Column('role', sa.String(length=50), nullable=True),
    sa.Column('date_registered', sa.DateTime(), nullable=True),
    sa.Column('sacco_id', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['sacco_id'], ['sacco.sacco_id'], ),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('vehicle',
    sa.Column('vehicle_type', sa.String(length=50), nullable=True),
    sa.Column('no_plate', sa.String(length=50), nullable=False),
    sa.Column('capacity', sa.Integer(), nullable=True),
    sa.Column('sacco_id', sa.String(length=100), nullable=False),
    sa.Column('driver_id', sa.String(length=100), nullable=True),
    sa.Column('verification_code', sa.String(length=50), nullable=True),
    sa.Column('date_registered', sa.DateTime(), nullable=True),
    sa.Column('balance', sa.Float(), nullable=True),
    sa.Column('rating', sa.Float(), nullable=True),
    sa.Column('fare', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['driver_id'], ['user.user_id'], ),
    sa.ForeignKeyConstraint(['sacco_id'], ['sacco.sacco_id'], ),
    sa.PrimaryKeyConstraint('no_plate')
    )
    op.create_table('booking',
    sa.Column('booking_id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('phone', sa.String(length=100), nullable=True),
    sa.Column('date', sa.String(length=100), nullable=False),
    sa.Column('time', sa.String(length=100), nullable=False),
    sa.Column('pickup_point', sa.String(length=100), nullable=False),
    sa.Column('destination', sa.String(length=100), nullable=False),
    sa.Column('vehicle_plate', sa.String(length=50), nullable=False),
    sa.Column('Status', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['email'], ['user.email'], ),
    sa.ForeignKeyConstraint(['vehicle_plate'], ['vehicle.no_plate'], ),
    sa.PrimaryKeyConstraint('booking_id')
    )
    op.create_table('transaction',
    sa.Column('transaction_id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('vehicle_id', sa.String(length=100), nullable=False),
    sa.Column('paid_at', sa.DateTime(), nullable=True),
    sa.Column('time', sa.String(length=50), nullable=True),
    sa.Column('booking_id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('phone_number', sa.String(length=50), nullable=True),
    sa.Column('status', sa.String(length=20), nullable=False),
    sa.ForeignKeyConstraint(['booking_id'], ['booking.booking_id'], ),
    sa.ForeignKeyConstraint(['email'], ['user.email'], ),
    sa.ForeignKeyConstraint(['vehicle_id'], ['vehicle.no_plate'], ),
    sa.PrimaryKeyConstraint('transaction_id'),
    sa.UniqueConstraint('booking_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('transaction')
    op.drop_table('booking')
    op.drop_table('vehicle')
    op.drop_table('user')
    op.drop_table('stages_routes')
    op.drop_table('stage')
    op.drop_table('sacco')
    op.drop_table('route')
    # ### end Alembic commands ###
