"""dates

Revision ID: 7b94b54b8168
Revises: 9d84ac7c4817
Create Date: 2024-02-13 17:54:16.141337

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7b94b54b8168'
down_revision = '9d84ac7c4817'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('booking', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.VARCHAR(length=100),
               type_=sa.Date(),
               nullable=True)
        batch_op.alter_column('time',
               existing_type=sa.VARCHAR(length=100),
               type_=sa.Time(),
               nullable=True)

    with op.batch_alter_table('transaction', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date', sa.Date(), nullable=True))
        batch_op.alter_column('time',
               existing_type=sa.VARCHAR(length=50),
               type_=sa.Time(),
               existing_nullable=True)
        batch_op.drop_column('paid_at')

    with op.batch_alter_table('trip', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date', sa.Date(), nullable=True))
        batch_op.add_column(sa.Column('time', sa.Time(), nullable=True))
        batch_op.drop_column('depature_time')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trip', schema=None) as batch_op:
        batch_op.add_column(sa.Column('depature_time', sa.VARCHAR(length=50), nullable=True))
        batch_op.drop_column('time')
        batch_op.drop_column('date')

    with op.batch_alter_table('transaction', schema=None) as batch_op:
        batch_op.add_column(sa.Column('paid_at', sa.DATETIME(), nullable=True))
        batch_op.alter_column('time',
               existing_type=sa.Time(),
               type_=sa.VARCHAR(length=50),
               existing_nullable=True)
        batch_op.drop_column('date')

    with op.batch_alter_table('booking', schema=None) as batch_op:
        batch_op.alter_column('time',
               existing_type=sa.Time(),
               type_=sa.VARCHAR(length=100),
               nullable=False)
        batch_op.alter_column('date',
               existing_type=sa.Date(),
               type_=sa.VARCHAR(length=100),
               nullable=False)

    # ### end Alembic commands ###