"""fare

Revision ID: 190202fc9390
Revises: be97c659c937
Create Date: 2024-02-13 14:13:14.434895

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '190202fc9390'
down_revision = 'be97c659c937'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trip', schema=None) as batch_op:
        batch_op.add_column(sa.Column('fare', sa.Float(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trip', schema=None) as batch_op:
        batch_op.drop_column('fare')

    # ### end Alembic commands ###