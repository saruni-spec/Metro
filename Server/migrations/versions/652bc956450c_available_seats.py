"""available_seats

Revision ID: 652bc956450c
Revises: 7b94b54b8168
Create Date: 2024-02-24 16:09:17.556616

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '652bc956450c'
down_revision = '7b94b54b8168'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trip', schema=None) as batch_op:
        batch_op.drop_column('booked_seats')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trip', schema=None) as batch_op:
        batch_op.add_column(sa.Column('booked_seats', sa.INTEGER(), nullable=True))

    # ### end Alembic commands ###