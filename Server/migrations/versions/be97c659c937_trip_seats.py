"""trip seats

Revision ID: be97c659c937
Revises: 04754c54cd74
Create Date: 2024-02-12 18:43:38.708665

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'be97c659c937'
down_revision = '04754c54cd74'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trip', schema=None) as batch_op:
        batch_op.add_column(sa.Column('booked_seats', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('depature_time', sa.String(length=50), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trip', schema=None) as batch_op:
        batch_op.drop_column('depature_time')
        batch_op.drop_column('booked_seats')

    # ### end Alembic commands ###